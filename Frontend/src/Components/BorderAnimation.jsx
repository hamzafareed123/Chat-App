

const BorderAnimation = ({ children, className = "" }) => {
  return (
    <div className={`w-full [background:linear-gradient(45deg,#172033,--theme(--color-slate-800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),--theme(--color-slate-600/.48)_80%,--theme(--color-indigo-500)_86%,--theme(--color-indigo-300)_90%,--theme(--color-indigo-500)_94%,--theme(--color-slate-600/.48))_border-box] rounded-2xl border border-transparent animate-border ${className}`}>
      {children}
    </div>
  );
};

export default BorderAnimation;
