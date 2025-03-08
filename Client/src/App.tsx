import { QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch } from "wouter";
import Layout from "./layout/layout";
import { queryClient } from "./lib/queryClient";
import Home from "./pages/home";
import NotFound from "./pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Router />
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
