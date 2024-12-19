import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  getAvailableTracks,
  Track,
  updateTrackStatus,
} from "@/service/managerService";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import PuffLoader from "react-spinners/PuffLoader";

const ITEMS_PER_PAGE = 10;

const AvailableTracks = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const totalPages = Math.ceil(tracks.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTracks = tracks.slice(startIndex, endIndex);

  const handlePagination = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchTracks = async () => {
    setIsLoading(true);
      try {
        const data = await getAvailableTracks();
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

  const handleStatusToggle = async (trackId: string) => {
    setUpdatingId(trackId);
    try {
      await updateTrackStatus(trackId);
      setTracks(
        tracks.map((track) =>
          track._id === trackId
            ? {
                ...track,
                status: track.status === "available" ? "disabled" : "available",
              }
            : track
        )
      );
      const updatedTrack = tracks.find((track) => track._id === trackId);
      toast({
        title: "Track status updated",
        description: `Track has been ${
          updatedTrack?.status === "available" ? "disabled" : "enabled"
        }`,
        className: "bg-green-500 text-white",
      });
    } catch (error) {
      console.error("Failed to update status:", error);
      toast({
        variant: "destructive",
        title: "Failed to update status",
        description: "Please try again later",
        className: "bg-red-500 text-white",
      });
    } finally {
      setUpdatingId(null);
    }
  };
  return (
    <div className="h-[500px] overflow-auto relative">
                {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <PuffLoader color="#36d7b7" size={60} />
          </div>
        ) : (
            <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Artist</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Views</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentTracks.map((track) => (
            <TableRow key={track._id}>
              <TableCell className="font-medium">{track.title}</TableCell>
              <TableCell>{track.artist}</TableCell>
              <TableCell>
                {Math.floor(track.media.fingerprint.duration / 60)}:
                {Math.floor(track.media.fingerprint.duration % 60)
                  .toString()
                  .padStart(2, "0")}
              </TableCell>
              <TableCell>{track.view.toLocaleString()}</TableCell>
              <TableCell className="text-right">
                <Switch
                  checked={track.status === "available"}
                  onCheckedChange={() => handleStatusToggle(track._id)}
                  className="data-[state=checked]:bg-green-500"
                  disabled={updatingId === track._id}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
              onClick={() => handlePagination(currentPage - 1)}
            />
          </PaginationItem>
          <PaginationItem>
            <span>
              Page {currentPage} of {totalPages}
            </span>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className={
                currentPage >= totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
              onClick={() => handlePagination(currentPage + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      </>
      )}
    </div>
  );
};

export default AvailableTracks;
