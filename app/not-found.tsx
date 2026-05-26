import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center py-20">
      <Container className="text-center max-w-lg">
        <div className="bg-sky-50 text-sky-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          The page you are looking for doesn't exist or has been moved. 
          Please check the URL or navigate back to our homepage.
        </p>
        <Button href="/" variant="primary">
          Return Home
        </Button>
      </Container>
    </div>
  );
}
