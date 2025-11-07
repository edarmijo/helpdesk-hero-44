import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Users, Ticket as TicketIcon, Bell } from "lucide-react";

interface Ticket {
  id: string;
  subject: string;
  service_type: string;
  description: string;
  status: string;
  created_at: string;
  profiles: {
    full_name: string;
    email: string;
    company_name: string;
  };
}

interface Profile {
  id: string;
  full_name: string;
  email: string;
  company_name: string;
  ruc: string;
  phone: string;
  created_at: string;
}

export default function Admin() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);

    // Fetch tickets with user profiles
    const { data: ticketsData } = await supabase
      .from("tickets")
      .select("*")
      .order("created_at", { ascending: false });

    if (ticketsData) {
      // Fetch profiles for each ticket
      const ticketsWithProfiles = await Promise.all(
        ticketsData.map(async (ticket) => {
          const { data: profile } = await supabase
            .from("profiles")
            .select("full_name, email, company_name")
            .eq("id", ticket.user_id)
            .single();
          return { ...ticket, profiles: profile };
        })
      );
      setTickets(ticketsWithProfiles as Ticket[]);
    }

    // Fetch users
    const { data: usersData } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (usersData) setUsers(usersData);

    setLoading(false);
  };

  const updateTicketStatus = async (ticketId: string, newStatus: string) => {
    const { error } = await supabase
      .from("tickets")
      .update({ status: newStatus })
      .eq("id", ticketId);

    if (error) {
      toast.error("Error al actualizar el estado");
    } else {
      toast.success("Estado actualizado correctamente");
      fetchData();
    }
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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-xl">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-navy">Panel de Administración</h1>
        <p className="text-muted-foreground">Gestione tickets y usuarios del sistema</p>
      </div>

      <Tabs defaultValue="tickets" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tickets">
            <TicketIcon className="mr-2 h-4 w-4" />
            Tickets
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4" />
            Usuarios
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notificaciones
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Tickets</CardTitle>
              <CardDescription>
                Total de tickets: {tickets.length}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {tickets.map((ticket) => (
                <Card key={ticket.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{ticket.subject}</CardTitle>
                        <CardDescription className="mt-1">
                          Cliente: {ticket.profiles?.full_name} ({ticket.profiles?.email})
                          <br />
                          Empresa: {ticket.profiles?.company_name || "No especificado"}
                        </CardDescription>
                      </div>
                      {getStatusBadge(ticket.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-sm">{ticket.description}</p>
                    <div className="flex items-center gap-4">
                      <Select
                        value={ticket.status}
                        onValueChange={(value) => updateTicketStatus(ticket.id, value)}
                      >
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pendiente</SelectItem>
                          <SelectItem value="in_progress">En Proceso</SelectItem>
                          <SelectItem value="resolved">Resuelto</SelectItem>
                          <SelectItem value="closed">Cerrado</SelectItem>
                        </SelectContent>
                      </Select>
                      <span className="text-xs text-muted-foreground">
                        {new Date(ticket.created_at).toLocaleDateString("es-ES")}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Usuarios Registrados</CardTitle>
              <CardDescription>Total de usuarios: {users.length}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <Card key={user.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{user.full_name}</CardTitle>
                      <CardDescription>
                        {user.email}
                        {user.company_name && ` • ${user.company_name}`}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2 text-sm">
                        {user.ruc && <div><strong>RUC:</strong> {user.ruc}</div>}
                        {user.phone && <div><strong>Teléfono:</strong> {user.phone}</div>}
                        <div className="text-xs text-muted-foreground">
                          Registrado: {new Date(user.created_at).toLocaleDateString("es-ES")}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notificaciones</CardTitle>
              <CardDescription>
                Sistema de notificaciones para cambios de estado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Las notificaciones se envían automáticamente cuando se actualiza el estado de
                un ticket.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
