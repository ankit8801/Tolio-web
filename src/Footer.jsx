export default function Footer({ openAdmin }) {
  return (
    <footer className="py-10 text-center text-neutral-500 dark:text-neutral-400">
      <p>© {new Date().getFullYear()} Tolio • Built by Ankit Jadhav</p>
      <button 
        onClick={openAdmin}
        className="mt-3 px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700"
      >
        Contact developer
      </button>
    </footer>
  );
}
