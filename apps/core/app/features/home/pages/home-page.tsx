import { Button, Card, CardHeader, CardContent, CardFooter, PageLoader, ThemeSwitcher, FullPageLoader, LoaderSpinner } from "@voxelcraft-playground/ui";

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
          <ThemeSwitcher />
          
          <div className="border p-4 my-4">
            <LoaderSpinner />
          </div>
          {/*<FullPageLoader description="Loading Voxelcraft Playground..." className="mb-4" />*/}
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Nead App
          </h1>
          <p className="text-xl">
            Built with React Router 7 and our custom UI components
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">
                Getting Started
              </h2>
            </CardHeader>
            <CardContent>
              <p>
                This is a demo of our monorepo setup with shared UI components.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="primary" size="sm">
                Learn More
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="color-secondary">
                UI Components
              </h2>
            </CardHeader>
            <CardContent>
              <p>
                Explore our custom UI components built with Base UI and Tailwind CSS.
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
              <h2 className="text-xl font-semibold">
                Documentation
              </h2>
            </CardHeader>
            <CardContent>
              <p>
                Check out our development guidelines and project structure.
              </p>
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
            <Button variant="primary" size="lg">
              Get Started
            </Button>
            <Button variant="outline" size="lg">
              View Source
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
