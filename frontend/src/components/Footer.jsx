export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4 mt-auto w-full shadow-inner">
      <div className="container mx-auto text-center text-sm">
        © {new Date().getFullYear()} Jiten Kumar. All Rights Reserved.
      </div>
    </footer>
  );
}
