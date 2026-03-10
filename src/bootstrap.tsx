import ReactDOM from "react-dom/client";
import Settings from "./Settings/Settings";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

class SettingsMFE extends HTMLElement {
    private root: ReactDOM.Root | null = null;

    connectedCallback() {
        
        if (!this.root) {
            this.root = ReactDOM.createRoot(this);
        }
        this.root.render(
            <QueryClientProvider client={queryClient}>
                <Settings />
            </QueryClientProvider>
        );
    }

    disconnectedCallback() {
        if (this.root) {
            this.root.unmount();
            this.root = null;
        }
    }
}

if (!customElements.get('mfe-settings')) {
    customElements.define('mfe-settings', SettingsMFE);
}