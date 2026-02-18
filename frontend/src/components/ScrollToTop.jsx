import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (!hash) {
            window.scrollTo(0, 0);
        } else {
            const id = hash.replace("#", "");
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            } else {
                // Retry for dynamic content
                const timer = setTimeout(() => {
                    const el = document.getElementById(id);
                    if (el) {
                        el.scrollIntoView({ behavior: "smooth" });
                    }
                }, 100);
                return () => clearTimeout(timer);
            }
        }
    }, [pathname, hash]);

    return null;
}
