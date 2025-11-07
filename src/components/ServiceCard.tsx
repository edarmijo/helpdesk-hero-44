import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  image?: string;
}

export function ServiceCard({ title, description, icon: Icon, image }: ServiceCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg hover:scale-105">
      {image && (
        <div className="h-48 w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform group-hover:scale-110"
          />
        </div>
      )}
      <CardHeader>
        <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-navy">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
