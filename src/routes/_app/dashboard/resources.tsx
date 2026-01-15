import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { PageHeader } from "@/shared/components/layout";
import { createFileRoute } from "@tanstack/react-router";
import { FolderOpen } from "lucide-react";

export const Route = createFileRoute("/_app/dashboard/resources")({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: "Resources" },
      { name: "description", content: "Learning resources and materials" },
    ],
  }),
});

function RouteComponent() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Resources"
        description="Access additional learning materials"
      />
      <Empty className="min-h-[400px] border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FolderOpen />
          </EmptyMedia>
          <EmptyTitle>No resources available</EmptyTitle>
          <EmptyDescription>
            Resources will appear here as you progress through your courses.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
