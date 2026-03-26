"use client"
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'
import { Plus, Calendar, Clock,Trash2, Layout, NotebookPen,PenTool,CheckCircle } from 'lucide-react';

export default function TaskPage() {
    const { user, isLoaded } = useUser();
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editId, setEditId] = useState<string | null>(null); 
    const [form, setForm] = useState({
        title: "",
        description: "",
        dueDate: "",
        dueTime: "",
        userId: ""
    });

    // upload userid to form state
    useEffect(() => {
        if (user?.id) {
            setForm(prev => ({ ...prev, userId: user.id }));
        }
    }, [user]);

    // function for fetching tasks from backend when the page is loaded first time 
    const fetchTasks = async () => {
        setLoading(true);
        try {
            const result = await fetch(`/api`);
            if (result.ok) {
                const data = await result.json() as { result: any[] };
                setTasks(data.result);
            }
        } catch (error) {
            console.error("Failed to fetch", error);
        } finally {
            setLoading(false);
        }
    };

    //handlechange for inputs when something is type then Formstate will be updated 
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
//for submitting Form data into state and passing to API routes 
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

        //condition if the editId state is true then the PUT route is used other wise POST is used 
    const method = editId ? "PUT" : "POST";

    const res = await fetch("/api", {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: editId }) 
    });

    if (res.ok) {
        setEditId(null); //set setEditId to null when the response from the route is ok 
        setForm({ title: "", description: "", dueDate: "", dueTime: "", userId: user?.id || "" });
        fetchTasks();
        alert(editId ? "Updated!" : "Created!");
    }
};
//for handling the delete button
    const handleDelete = async (id: string) => {
const confirmation = window.confirm("Are you sure you want to delete this task ")
if (confirmation === true ){


      const res = await fetch("/api", {
        method: "DELETE",
        body: JSON.stringify({ id:id }) 
    });

      if (res.ok) {
       
            setTasks((prev) => prev.filter((task) => task.id !== id));
            alert("Task deleted");
        } else {
            alert("Failed to delete task from server");
        }

    }

    }





//handleing Edit button of tasks 
const handleEdit = (task: any) => {
    setEditId(task.id); // it will update the EditId state which tell the Edit mode is on or off when the id is save then edit mode other wise created 
    
    setForm({
        title: task.title || "",
        description: task.description || "",
        dueDate: task.duedate ? task.duedate.split('T')[0] : "",
        dueTime: task.duetime || "",
        userId: task.user_id || ""
    });
};
//for button status pending or done 
const handleToggleStatus = async (id: string, currentStatus: string) => {
    //status is coming from button then it will flip it pending to completed 
    const newStatus = currentStatus === "pending" ? "completed" : "pending";

    // updating the database to use route PUT and update only status
    const res = await fetch("/api", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus })
    });

    if (res.ok) {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
    }
};



    return (
    <main className="min-h-screen bg-[#fafafa] text-slate-900 font-sans selection:bg-blue-100">
            
            {/* --- SECTION 1: TASK COMMAND CENTRE --- */}
            <section className="max-w-6xl mx-auto py-8 md:py-12 px-4 md:px-6">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold tracking-tight">Project Planning</h1>
                    <p className="text-slate-500">Manage your tasks and draft your project requirements.</p>
                </header>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">         
                    {/* LEFT: Task Form & Text Editor Feel */}
                    <div className="lg:col-span-7">
                        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 md:p-6 transition-all hover:shadow-md">
                            <div className="flex items-center gap-2 mb-4 text-blue-600 font-semibold uppercase text-xs tracking-wider">
                                <Plus size={18} strokeWidth={3} />
                                <span>Quick Entry</span>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input 
                                    name="title" 
                                    value={form.title} 
                                    onChange={handleChange} 
                                    className="w-full text-xl font-semibold outline-none placeholder:text-slate-300 bg-transparent" 
                                    placeholder="Task Title..." 
                                />
                                
                                <div className="border-t border-slate-100 pt-4">
                                    <textarea 
                                        name="description" 
                                        value={form.description} 
                                        onChange={handleChange}
                                        className="w-full h-32 md:h-44 resize-none outline-none text-slate-600 leading-relaxed placeholder:text-slate-300 bg-transparent"
                                        placeholder="Add a detailed description or project notes here..."
                                    />
                                </div>

                                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
                                    <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100 group focus-within:border-blue-400 transition-all">
                                        <Calendar size={14} className="text-slate-400 group-focus-within:text-blue-500" />
                                        <input name="dueDate" type="date" value={form.dueDate} onChange={handleChange} className="bg-transparent text-xs outline-none cursor-pointer font-medium" />
                                    </div>
                                    <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100 group focus-within:border-blue-400 transition-all">
                                        <Clock size={14} className="text-slate-400 group-focus-within:text-blue-500" />
                                        <input name="dueTime" type="time" value={form.dueTime} onChange={handleChange} className="bg-transparent text-xs outline-none cursor-pointer font-medium" />
                                    </div>
                           
                                    <button type="submit" className="ml-auto w-full sm:w-auto bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-600 transition-all active:scale-95 shadow-md">
                                        Save Task
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* RIGHT: Task List */}
               <div className="lg:col-span-5 h-[600px] flex flex-col bg-slate-50/50 rounded-3xl p-4 border border-slate-100">
  
    <div className="flex items-center justify-between mb-6 px-2">
        <h2 className="font-bold flex items-center gap-2 text-slate-700 text-lg">
            <Layout size={20} className="text-blue-500" /> 
            Active Tasks
        </h2>
        <span className="text-[10px] font-black bg-blue-100 text-blue-600 px-3 py-1 rounded-full shadow-sm">
            {tasks.filter(t => t.status === "pending").length} Remaining
        </span>
    </div>
    
   
    <div className="overflow-y-auto space-y-4 pr-2 custom-scrollbar flex-1">
        {loading ? (
            <div className="flex items-center justify-center h-20 text-slate-400 text-sm animate-pulse italic">
                Syncing your workspace...
            </div>
        ) : (
            tasks
                .filter(t => t.status === "pending") // Hides completed tasks
                .map((t, i) => (
                    <div key={t.id || i} className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group relative">
                        
                      
                        <div className="flex justify-between items-start mb-1">
                            <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-tight">
                                {t.title}
                            </h4>
                        </div>

                     
                        <p className="text-sm text-slate-500 line-clamp-2 mb-4 font-medium leading-relaxed">
                            {t.description}
                        </p>

                        
                        <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                     
                            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded">
                                    <Calendar size={12} className="text-slate-300"/> 
                                    {t.duedate ? new Date(t.duedate).toLocaleDateString('en-GB') : "No Date"}
                                </span>
                                <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded">
                                    <Clock size={12} className="text-slate-300"/> 
                                    {t.duetime ? t.duetime.slice(0, 5) : "Asap"}
                                </span>
                            </div>

                         
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                    onClick={() => handleEdit(t)}
                                    className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                    title="Edit Task"
                                >
                                    <PenTool size={14} />
                                </button>
                                <button 
                                    onClick={() => handleDelete(t.id)}
                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Delete Task"
                                >
                                    <Trash2 size={14} />
                                </button>
                                <button 
                                    onClick={() => handleToggleStatus(t.id, t.status)}
                                    className="ml-2 flex items-center gap-1 text-[10px] font-bold uppercase bg-green-50 text-green-600 px-3 py-1.5 rounded-lg hover:bg-green-600 hover:text-white transition-all border border-green-100"
                                >
                                    <CheckCircle size={12} />
                                    Done
                                </button>
                            </div>
                        </div>
                    </div>                                                             
                ))
        )} 

      
        {!loading && tasks.filter(t => t.status === "pending").length === 0 && (
            <div className="text-center py-10">
                <p className="text-slate-400 text-sm">All caught up! 🎉</p>
            </div>
        )}
    </div>
</div>

                </div>
            </section>

            {/* --- SECTION 2: THE INFINITE CANVAS --- */}
            <section className="border-t border-slate-200 mt-10 relative">
                {/* Sticky Board Header */}
                <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-bold flex items-center gap-2">
                            <NotebookPen size={20} className="text-blue-500" /> 
                            Visual Strategy Board
                        </h2>
                        <p className="hidden sm:block text-xs text-slate-400">Mind-mapping and project diagrams area</p>
                    </div>
                    <button 
                        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} 
                        className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"
                    >
                        Back to Tasks ↑
                    </button>
                </div>
                
                {/* Fixed Height Board with internal scroll capture */}
                <div className="h-[600px] md:h-[800px] w-full bg-white relative overflow-hidden">
                    <Tldraw 
                        autoFocus={false} 
                        inferDarkMode={false}
                        className="tldraw-custom-ui"
                    />
                </div>
            </section>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
                
                /* This prevents the parent page from scrolling while interacting with the whiteboard */
                .tl-container { touch-action: none; }
            `}</style>
        </main>
    );
}
