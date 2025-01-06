import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AppliedArtist } from "@/data/mockAppliedArtistData";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ArtistDetailModalProps {
  artist: AppliedArtist | null;
  isOpen: boolean;
  onClose: () => void;
}

const ArtistDetailModal = ({
  artist,
  isOpen,
  onClose,
}: ArtistDetailModalProps) => {

  const { toast } = useToast();

  if (!artist) return null;

  const handleApprove = () => {
    // Add API call here
    console.log("Approved artist:", artist._id);
    toast({
        title: "Artist Approved",
        description: `${artist.name}'s application has been approved successfully.`,
        className: "bg-green-500 text-white",
        duration: 3000,
      });
    onClose();
  };

  const handleReject = () => {
    // Add API call here
    console.log("Rejected artist:", artist._id);
    toast({
        title: "Artist Rejected",
        description: `${artist.name}'s application has been rejected.`,
        className: "bg-red-500 text-white",
        duration: 3000,
      });
    onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Artist Details</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>{artist.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="text-center">
            <h3 className="text-xl font-semibold">{artist.name}</h3>
            <p className="text-gray-500">{artist.email}</p>
          </div>

          <div className="w-full space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Status</span>
              <span
                className={`px-2 py-1 rounded-full text-sm ${
                  artist.status === "approved"
                    ? "bg-green-100 text-green-800"
                    : artist.status === "rejected"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {artist.status}
              </span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Application Date</span>
              <span>{new Date(artist.createdAt).toLocaleDateString()}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Time</span>
              <span>{new Date(artist.createdAt).toLocaleTimeString()}</span>
            </div>
            {artist.status === "pending" && (
              <div className="flex gap-4 pt-4">
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={handleApprove}
                >
                  Approve
                </Button>
                <Button
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  onClick={handleReject}
                >
                  Reject
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArtistDetailModal;
