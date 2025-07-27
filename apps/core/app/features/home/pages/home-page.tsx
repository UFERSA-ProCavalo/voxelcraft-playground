import { Button } from "../../playground/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "../../playground/components/ui/card";
import { LoaderSpinner } from "../../playground/components/ui/LoaderSpinner";
// import { PageLoader } from '../../playground/components/ui/PageLoader';
// import { FullPageLoader } from '../../playground/components/ui/FullPageLoader';
// TODO: Implement ThemeSwitcher locally or remove for now

export function meta() {
  return [
    { title: "Voxelcraft Playground - Home" },
    { name: "description", content: "Welcome to Voxelcraft Playground!" },
  ];
}

export default function Home() {
  return (
    <div>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          {/* TODO: Add ThemeSwitcher here if implemented locally */}
          <div className="border p-4 my-4">
            <LoaderSpinner />
          </div>
          {/*<FullPageLoader description="Loading Voxelcraft Playground..." className="mb-4" />*/}
          <h1 className="text-4xl font-bold mb-4">Welcome to Nead App</h1>{" "}
          <p className="text-xl">
            Built with React Router 7 and our custom UI components
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Getting Started</h2>
            </CardHeader>
            <CardContent>
              <p>
                This is a demo of our monorepo setup with shared UI components.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="default" size="sm">
                Learn More
              </Button>{" "}
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="color-secondary">UI Components</h2>
            </CardHeader>
            <CardContent>
              <p>
                Explore our custom UI components built with Base UI and Tailwind
                CSS.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" size="sm">
                View Components
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Documentation</h2>
            </CardHeader>
            <CardContent>
              <p>Check out our development guidelines and project structure.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                Read Docs
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <div className="space-x-4">
            <Button variant="default" size="lg">
              Get Started
            </Button>{" "}
            <Button variant="outline" size="lg">
              View Source
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
