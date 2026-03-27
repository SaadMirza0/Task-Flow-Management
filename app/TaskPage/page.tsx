"use client"
import { useState, useEffect,useRef } from "react";
import { useUser,Show } from "@clerk/nextjs";
import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'
import { Plus, Calendar, Clock,Trash2, Layout, NotebookPen,PenTool,CheckCircle,Expand } from 'lucide-react';

export default function TaskPage() {
    const [mounted, setMounted] = useState(false);
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
   const boardRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const board = boardRef.current;
        if (!board) return;

        // FORCE cancel any scroll event that happens inside this div
        const handleWheel = (e: WheelEvent) => {
            e.preventDefault(); 
            e.stopPropagation();
        };

        // 'passive: false' is required to allow e.preventDefault()
        board.addEventListener("wheel", handleWheel, { passive: false });
        
        return () => board.removeEventListener("wheel", handleWheel);
    }, []);
const userid = user?.id
    // upload userid to form state
    useEffect(() => {
        if (user?.id) {
            setForm(prev => ({ ...prev, userId: user.id }));
        }
    }, [user]);
  
    // function for fetching tasks from backend when the page is loaded first time 
    const fetchTasks = async () => {
        
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
    useEffect(() => {
        setMounted(true);
        fetchTasks(); // Move your initial fetch here too
    }, []);
      if (!mounted) return null; 
    //handlechange for inputs when something is type then Formstate will be updated 
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
//for submitting Form data into state and passing to API routes 

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   const payload = {
        ...form,
        id: editId,
        dueTime: form.dueTime === "" ? null : form.dueTime,
        dueDate: form.dueDate === "" ? null : form.dueDate
    };
        //condition if the editId state is true then the PUT route is used other wise POST is used 
    const method = editId ? "PUT" : "POST";

    const res = await fetch("/api", {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( payload) 
    });
        
    if (res.ok) {
        setEditId(null); //set setEditId to null when the response from the route is ok 
        setForm({ title: "", description: "", dueDate: "", dueTime: "", userId: user?.id || "" });
        fetchTasks();
        alert(editId ? "Updated!" : "Created!");
        console.log(form)
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
        <main>
<Show when={"signed-out"}>signin</Show>
        <Show when={"signed-in"}>
    <div suppressHydrationWarning className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-blue-500/30 overflow-x-hidden">
            
            {/* --- SECTION 1: TASK COMMAND CENTRE --- */}
<section className="max-w-6xl mx-auto py-8 md:py-12 px-4 md:px-6">
<header className="mb-10">
                    <h1 className="text-3xl font-bold tracking-tight">Project Planning</h1>
                    <p className="text-slate-500">Manage your tasks and draft your project requirements.</p>
                </header>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">         
                    {/* LEFT: Task Form & Text Editor Feel */}
              <div className="lg:col-span-7">
    <div className="group bg-[#0B0F1A] border border-slate-800 rounded-[2rem] shadow-2xl p-6 md:p-8 transition-all hover:border-blue-500/40 hover:shadow-blue-500/5 relative overflow-hidden">
        
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[80px] rounded-full pointer-events-none" />

        <div className="flex items-center gap-2 mb-6 text-blue-400 font-bold uppercase text-[10px] tracking-[0.2em]">
            <div className="p-1.5 bg-blue-500/10 rounded-lg">
                <Plus size={16} strokeWidth={3} />
            </div>
            <span>Quick Entry</span>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
            <input 
                name="title" 
                value={form.title} 
                onChange={handleChange} 
                className="w-full text-2xl md:text-3xl font-bold outline-none placeholder:text-slate-700 bg-transparent text-white selection:bg-blue-500/30 transition-all focus:translate-x-1" 
                placeholder="Task Title..." 
            />
            
            <div className="border-t border-white/5 pt-6">
                <textarea 
                    name="description" 
                    value={form.description} 
                    onChange={handleChange}
                    className="w-full h-32 md:h-44 resize-none outline-none text-slate-400 leading-relaxed placeholder:text-slate-800 bg-transparent focus:text-slate-200 transition-colors"
                    placeholder="Add a detailed description or project notes here..."
                />
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/5">
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2.5 rounded-2xl border border-white/5 group/input focus-within:border-blue-500/50 transition-all hover:bg-white/[0.08]">
                    <Calendar size={14} className="text-slate-500 group-focus-within/input:text-blue-400" />
                    <input 
                        name="dueDate" 
                        type="date" 
                        value={form.dueDate} 
                        onChange={handleChange} 
                        className="bg-transparent text-xs outline-none cursor-pointer font-semibold text-slate-300 [color-scheme:dark]" 
                    />
                </div>
                
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2.5 rounded-2xl border border-white/5 group/input focus-within:border-blue-500/50 transition-all hover:bg-white/[0.08]">
                    <Clock size={14} className="text-slate-500 group-focus-within/input:text-blue-400" />
                    <input 
                        name="dueTime" 
                        type="time" 
                        value={form.dueTime} 
                        onChange={handleChange} 
                        className="bg-transparent text-xs outline-none cursor-pointer font-semibold text-slate-300 [color-scheme:dark]" 
                    />
                </div>
       
                <button 
                    type="submit" 
                    className="ml-auto w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-2xl font-black text-sm tracking-wide hover:bg-blue-500 transition-all active:scale-95 shadow-lg shadow-blue-900/20"
                >
                    SAVE TASK
                </button>
            </div>
        </form>
    </div>
</div>
{<Show when={"signed-out"}>
    <p>Sign-In to show tasks </p>
    </Show>}
                    {/* RIGHT: Task List */}
              <div className="lg:col-span-5 h-[600px] flex flex-col bg-[#0B0F1A] rounded-[2.5rem] p-6 border border-slate-800 shadow-2xl relative overflow-hidden">
    {/* Header Section */}
    <div className="flex items-center justify-between mb-8 px-2">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl">
                <Layout size={22} className="text-blue-400" />
            </div>
            <h2 className="font-bold text-white text-xl tracking-tight">
                Active Tasks
            </h2>
        </div>
        <span className="text-[10px] font-black bg-blue-500/10 text-blue-400 border border-blue-500/20 px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
            {tasks.filter(t => t.status === "pending").length} Remaining
        </span>
    </div>
    
    {/* Tasks List */}
    <div className="overflow-y-auto space-y-4 pr-2 custom-scrollbar flex-1 scroll-smooth">
        {loading ? (
            <div className="flex flex-col items-center justify-center h-40 gap-4">
                <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                <p className="text-slate-500 text-sm font-medium animate-pulse">Syncing your workflow...</p>
            </div>
        ) : (
            tasks.filter(t => t.status === "pending").map((t, i) => (
                <div 
                    key={t.id || i} 
                    className="bg-slate-900/40 backdrop-blur-sm p-5 rounded-3xl border border-white/5 hover:border-blue-500/40 hover:bg-slate-900/60 transition-all group relative overflow-hidden"
                >
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
                    
                    <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-slate-100 group-hover:text-blue-400 transition-colors leading-tight text-lg">
                            {t.title}
                        </h4>
                    </div>

                    <p className="text-sm text-slate-400 line-clamp-2 mb-5 font-medium leading-relaxed group-hover:text-slate-300">
                        {t.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        {/* Meta Info */}
                        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest">
                            <span className="flex items-center gap-1.5 bg-white/5 text-slate-400 px-3 py-1.5 rounded-xl border border-white/5">
                                <Calendar size={12} className="text-blue-500/70"/> 
                                {t.duedate ? new Date(t.duedate).toLocaleDateString('en-GB') : "No Date"}
                            </span>
                            <span className="flex items-center gap-1.5 bg-white/5 text-slate-400 px-3 py-1.5 rounded-xl border border-white/5">
                                <Clock size={12} className="text-blue-500/70"/> 
                                {t.duetime ? t.duetime.slice(0, 5) : "Asap"}
                            </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0">
                            <button 
                                onClick={() => handleEdit(t)}
                                className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-colors"
                            >
                                <PenTool size={14} />
                            </button>
                            <button 
                                onClick={() => handleDelete(t.id)}
                                className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                            >
                                <Trash2 size={14} />
                            </button>
                            <button 
                                onClick={() => handleToggleStatus(t.id, t.status)}
                                className="ml-2 flex items-center gap-2 text-[10px] font-black uppercase bg-green-500/10 text-green-400 px-4 py-2 rounded-xl hover:bg-green-500 hover:text-white transition-all border border-green-500/20 active:scale-90"
                            >
                                <CheckCircle size={14} />
                                Done
                            </button>
                        </div>
                    </div>
                </div>                                                             
            ))
        )} 
    </div>

    {/* Custom CSS for the board scrollbar */}
    <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3b82f6; }
    `}</style>
</div>
</div>
            </section>

            {/* --- SECTION 2: THE INFINITE CANVAS --- */}
           <section className="mt-16 mx-4 md:mx-10 mb-20 overflow-hidden rounded-3xl border border-slate-800 bg-[#0B0F1A] shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)]">
            <div className="sticky top-0 z-20 bg-slate-900/90 backdrop-blur-xl px-6 py-4 border-b border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                        <NotebookPen size={20} className="text-blue-400" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white">Strategy Canvas</h2>
                        <p className="hidden sm:block text-[10px] uppercase tracking-widest text-slate-500 font-bold">Capture your workflow visually</p>
                    </div>
                </div>
                <button 
                    onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} 
                    className="text-xs font-bold text-blue-400 hover:bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-xl"
                >
                    Return to Tasks ↑
                </button>
            </div>
            
            <div 
                ref={boardRef}

                onPointerDown={(e) => e.stopPropagation()} 
                className="h-[75vh] w-full bg-[#111] relative overflow-hidden"
                style={{ touchAction: 'none', overscrollBehavior: 'none' }}
            >
                <Tldraw 
                    autoFocus={false} 
                    inferDarkMode={true}
                    persistenceKey={userid}
                />
            </div>
        </section>
        </div>
        </Show>
        </main>
    );
}
