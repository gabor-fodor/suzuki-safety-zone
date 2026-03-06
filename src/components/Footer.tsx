const Footer = () => {
  return (
    <footer className="border-t border-border py-8 px-4">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© 2026 Suzuki – A te biztonsági zónád</p>
        <div className="flex gap-6">
          <a href="#cookie" className="hover:text-foreground transition-colors">
            Cookie szabályzat
          </a>
          <a href="#privacy" className="hover:text-foreground transition-colors">
            Adatvédelmi tájékoztató
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
