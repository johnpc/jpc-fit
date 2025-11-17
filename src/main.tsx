import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import App from "./App.tsx";
import "./index.css";
import { Theme, ThemeProvider } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { AuthProvider } from "./hooks/useAuth";
import { SubscriptionProvider } from "./providers/SubscriptionProvider";

Amplify.configure(outputs);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const theme: Theme = {
  name: "my-theme",
  primaryColor: "purple",
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SubscriptionProvider>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </SubscriptionProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
