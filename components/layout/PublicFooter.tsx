"use client";

export function PublicFooter() {
    return (
        <footer className="border-t bg-slate-50 dark:bg-slate-900 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-fuchsia-400">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-bold mb-4">About</h3>
                        <p className="text-sm text-gray-600">School information</p>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/academics" className="hover:underline">Academics</a></li>
                            <li><a href="/news" className="hover:underline">News</a></li>
                            <li><a href="/contact" className="hover:underline">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Support</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/contact" className="hover:underline">Help</a></li>
                            <li><a href="/" className="hover:underline">FAQ</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/" className="hover:underline">Privacy</a></li>
                            <li><a href="/" className="hover:underline">Terms</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
                    <p>&copy; 2024 School. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
