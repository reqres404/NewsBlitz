import { QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch } from "wouter";
import Layout from "./layout/layout";
import { queryClient } from "./lib/queryClient";
import Donate from "./pages/donate";
import Feedback from "./pages/feedback";
import Home from "./pages/home";
import News from "./pages/news";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/news" component={News} />
      <Route path="/feedback" component={Feedback} />
      <Route path="/donate" component={Donate} />
      <Route path="/about" component={Feedback} />
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
