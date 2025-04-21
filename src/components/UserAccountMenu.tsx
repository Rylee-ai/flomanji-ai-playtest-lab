
import React, { useState } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { UserRound, LogOut, Mail, Key, Edit2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

export const UserAccountMenu: React.FC = () => {
  const { profile, user, signOut, refreshProfile } = useAuth();
  const [editContactOpen, setEditContactOpen] = useState(false);
  const [editPasswordOpen, setEditPasswordOpen] = useState(false);

  // Local form state for updating contact info
  const [firstName, setFirstName] = useState(profile?.firstName ?? "");
  const [lastName, setLastName] = useState(profile?.lastName ?? "");
  const [email, setEmail] = useState(user?.email ?? "");

  // Local form state for password
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // Simulated contact info update (replace with backend logic as needed)
  const handleContactUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with actual backend update logic
    toast({
      title: "Contact info updated",
      description: "Your information has been updated.",
    });
    setEditContactOpen(false);
    refreshProfile();
  };

  // Simulated password update (replace with backend logic as needed)
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    // TODO: Replace with Supabase user update API
    toast({
      title: "Password changed",
      description: "Your password has been updated.",
    });
    setEditPasswordOpen(false);
    setPassword("");
    setPasswordConfirm("");
  };

  return (
    <>
      {/* Dropdown menu trigger */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="rounded-full px-2 py-2" aria-label="User account menu">
            <UserRound className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[210px]">
          <DropdownMenuLabel>
            <div>
              <div className="font-semibold">{profile?.firstName} {profile?.lastName}</div>
              <div className="text-xs text-muted-foreground truncate max-w-[160px]">{user?.email}</div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setEditContactOpen(true)}>
            <Edit2 className="mr-2 h-4 w-4" /> Update Contact Info
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setEditPasswordOpen(true)}>
            <Key className="mr-2 h-4 w-4" /> Change Password
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={async () => signOut()}
            className="text-red-600 focus:text-red-700"
          >
            <LogOut className="mr-2 h-4 w-4" /> Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit contact info dialog */}
      <Dialog open={editContactOpen} onOpenChange={setEditContactOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Contact Info</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleContactUpdate} className="space-y-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={email}
                disabled
                className="bg-gray-100"
              />
              <p className="text-xs text-muted-foreground">Email can only be changed by an admin.</p>
            </div>
            <DialogFooter>
              <Button type="submit">Update Info</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Change password dialog */}
      <Dialog open={editPasswordOpen} onOpenChange={setEditPasswordOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>
          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div>
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                minLength={8}
                value={password}
                required
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="passwordConfirm">Confirm Password</Label>
              <Input
                id="passwordConfirm"
                type="password"
                minLength={8}
                value={passwordConfirm}
                required
                onChange={e => setPasswordConfirm(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Change Password</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserAccountMenu;
