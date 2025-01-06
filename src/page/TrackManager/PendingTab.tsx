import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getPendingTracks, cancelPendingTrack, Track } from "@/service/managerService";
import { PuffLoader } from "react-spinners";



const PendingTracks = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTracks = async () => {
      setIsLoading(true);
      try {
        const data = await getPendingTracks();
        setTracks(data);
      } catch (error) {
        console.error("Failed to fetch tracks:", error);
        toast({
          variant: "destructive",
          title: "Failed to fetch tracks",
          description: "Please try again later",
          className: "bg-red-500 text-white",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTracks();
  }, []);

  const handleCancelPending = async (trackId: string) => {
    try {
      await cancelPendingTrack(trackId);
      setTracks(tracks.filter(track => track._id !== trackId));
      toast({
        title: "Request cancelled",
        description: "Track request has been cancelled",
      });
    } catch (error) {
        console.error("Failed to cancel request:", error);
      toast({
        variant: "destructive",
        title: "Failed to cancel request",
        description: "Please try again later",
        className: "bg-red-500 text-white",
      });
    }
  };

  return (
    <div className="h-[500px] overflow-auto scrollbar-hide relative">
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <PuffLoader color="#36d7b7" size={60} />
        </div>
      ) : tracks.length === 0 ? (
        <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-lg">
          No pending tracks available
        </div>
      ) : (
        <Table>
          <TableHeader className="sticky top-0 bg-white z-10">
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Artist</TableHead>
              <TableHead>Duration</TableHead>
              {/* <TableHead>Views</TableHead> */}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tracks.map((track) => (
              <TableRow key={track._id}>
                <TableCell className="font-medium">{track.title}</TableCell>
                <TableCell>{track.artist}</TableCell>
                <TableCell>
                  {Math.floor(track.media.fingerprint.duration / 60)}:
                  {Math.floor(track.media.fingerprint.duration % 60).toString().padStart(2, '0')}
                </TableCell>
                {/* <TableCell>{track.view.toLocaleString()}</TableCell> */}
                <TableCell className="text-right">
                  <Button 
                    variant="destructive" 
                    onClick={() => handleCancelPending(track._id)}
                  >
                    Cancel Request
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default PendingTracks;
