import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Ticket as TicketIcon, Clock } from "lucide-react";

interface Ticket {
  id: string;
  subject: string;
  service_type: string;
  description: string;
  status: string;
  created_at: string;
}

export default function Tickets() {
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, [user]);

  const fetchTickets = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("tickets")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Error al cargar tickets");
    } else {
      setTickets(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const subject = formData.get("subject") as string;
    const serviceType = formData.get("serviceType") as string;
    const description = formData.get("description") as string;

    const { error } = await supabase.from("tickets").insert({
      user_id: user.id,
      subject,
      service_type: serviceType,
      description,
      status: "pending",
    });

    if (error) {
      toast.error("Error al crear ticket");
    } else {
      toast.success("Ticket creado exitosamente");
      setShowForm(false);
      fetchTickets();
      (e.target as HTMLFormElement).reset();
    }

    setLoading(false);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "outline",
      in_progress: "default",
      resolved: "default",
      closed: "secondary",
    } as const;

    const labels = {
      pending: "Pendiente",
      in_progress: "En Proceso",
      resolved: "Resuelto",
      closed: "Cerrado",
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"} className={status === "resolved" ? "bg-success text-success-foreground" : ""}>
        {labels[status as keyof typeof labels] || status}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-navy">Mis Tickets</h1>
        <p className="text-muted-foreground">Gestione sus solicitudes de servicio técnico</p>
      </div>

      {!showForm && (
        <Button onClick={() => setShowForm(true)} className="mb-8 bg-primary hover:bg-primary/90">
          <TicketIcon className="mr-2 h-5 w-5" />
          Crear Nuevo Ticket
        </Button>
      )}

      {showForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Nuevo Ticket de Servicio</CardTitle>
            <CardDescription>
              Los datos de contacto se cargarán automáticamente de su perfil
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={profile?.email || ""} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Nombre</Label>
                  <Input value={profile?.full_name || ""} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Empresa</Label>
                  <Input value={profile?.company_name || "No especificado"} disabled />
                </div>
                <div className="space-y-2">
                  <Label>RUC</Label>
                  <Input value={profile?.ruc || "No especificado"} disabled />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Asunto *</Label>
                <Input
                  id="subject"
                  name="subject"
                  required
                  placeholder="Descripción breve del problema"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="serviceType">Tipo de Servicio *</Label>
                <Select name="serviceType" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un servicio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="impresoras_computadoras">
                      Impresoras y Computadoras
                    </SelectItem>
                    <SelectItem value="servidores_nubes">Servidores y Nubes</SelectItem>
                    <SelectItem value="soporte_tecnico">Soporte Técnico</SelectItem>
                    <SelectItem value="camaras_seguridad">Cámaras de Seguridad</SelectItem>
                    <SelectItem value="suscripciones">Suscripciones</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción *</Label>
                <Textarea
                  id="description"
                  name="description"
                  required
                  placeholder="Ingrese aquí su consulta detallada..."
                  rows={6}
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90">
                  {loading ? "Enviando..." : "Enviar Ticket"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-navy">Historial de Tickets</h2>
        {tickets.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <TicketIcon className="mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-muted-foreground">No tiene tickets registrados</p>
            </CardContent>
          </Card>
        ) : (
          tickets.map((ticket) => (
            <Card key={ticket.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{ticket.subject}</CardTitle>
                    <CardDescription className="mt-1">
                      {ticket.service_type.replace(/_/g, " ").toUpperCase()}
                    </CardDescription>
                  </div>
                  {getStatusBadge(ticket.status)}
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">{ticket.description}</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  {new Date(ticket.created_at).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
