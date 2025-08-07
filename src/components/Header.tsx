const Header = () => {
  return (
    <div className="bg-slate-800 ">
      <div className="mx-auto px-5 py-16 container">
        <div className="flex justify-between items-center">
          <div>
            <img className="w-32" src="/logo.svg" alt="imagen logo" />
          </div>
          <nav>navegacion</nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
