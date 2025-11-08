import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Users, Ticket as TicketIcon, Bell, Send } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

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
  const { user: currentUser } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [notificationDialog, setNotificationDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [notificationForm, setNotificationForm] = useState({
    title: "",
    message: "",
    type: "info",
  });

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

  const sendNotification = async () => {
    if (!selectedUserId || !notificationForm.title || !notificationForm.message) {
      toast.error("Complete todos los campos");
      return;
    }

    const { error } = await supabase.from("notifications").insert({
      user_id: selectedUserId,
      title: notificationForm.title,
      message: notificationForm.message,
      type: notificationForm.type,
    });

    if (error) {
      toast.error("Error al enviar notificación");
    } else {
      toast.success("Notificación enviada exitosamente");
      setNotificationDialog(false);
      setNotificationForm({ title: "", message: "", type: "info" });
      setSelectedUserId("");
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

  // Check if current user is admin with @sassblum.com email
  const isValidAdmin = currentUser?.email?.endsWith("@sassblum.com");

  if (!isValidAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Acceso Denegado</CardTitle>
            <CardDescription>
              Solo los administradores con email @sassblum.com pueden acceder a este panel.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

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
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Gestión de Notificaciones</CardTitle>
                  <CardDescription>
                    Envíe notificaciones personalizadas a los usuarios
                  </CardDescription>
                </div>
                <Dialog open={notificationDialog} onOpenChange={setNotificationDialog}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90">
                      <Send className="mr-2 h-4 w-4" />
                      Nueva Notificación
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Enviar Notificación</DialogTitle>
                      <DialogDescription>
                        Envíe una notificación personalizada a un usuario
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Usuario</Label>
                        <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione un usuario" />
                          </SelectTrigger>
                          <SelectContent>
                            {users.map((user) => (
                              <SelectItem key={user.id} value={user.id}>
                                {user.full_name} ({user.email})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Título</Label>
                        <Input
                          value={notificationForm.title}
                          onChange={(e) =>
                            setNotificationForm({ ...notificationForm, title: e.target.value })
                          }
                          placeholder="Título de la notificación"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Mensaje</Label>
                        <Textarea
                          value={notificationForm.message}
                          onChange={(e) =>
                            setNotificationForm({ ...notificationForm, message: e.target.value })
                          }
                          placeholder="Contenido de la notificación"
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Tipo</Label>
                        <Select
                          value={notificationForm.type}
                          onValueChange={(value) =>
                            setNotificationForm({ ...notificationForm, type: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="info">Información</SelectItem>
                            <SelectItem value="success">Éxito</SelectItem>
                            <SelectItem value="warning">Advertencia</SelectItem>
                            <SelectItem value="error">Error</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={sendNotification} className="w-full">
                        Enviar Notificación
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-muted p-4">
                <p className="mb-2 font-semibold">Sistema de Notificaciones Automáticas</p>
                <p className="text-sm text-muted-foreground">
                  Las notificaciones se envían automáticamente cuando:
                </p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">
                  <li>Se actualiza el estado de un ticket</li>
                  <li>Se asigna un responsable a un ticket</li>
                  <li>Un administrador envía una notificación manual</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
