import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { ArtistRequest, getApprovedArtistRequests } from "@/service/managerService";
import ArtistDetailModal from "@/layout/components/ArtistDetailModal/ArtistDetailModal";

const ApprovedArtists = () => {
  const [selectedArtist, setSelectedArtist] = useState<ArtistRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: approvedArtists, isLoading } = useQuery({
    queryKey: ['artistRequests', 'approved'],
    queryFn: getApprovedArtistRequests
  });

  const handleRowClick = (artist: ArtistRequest) => {
    setSelectedArtist(artist);
    setIsModalOpen(true);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="h-[500px] overflow-auto scrollbar-hide relative">
        {!approvedArtists?.length ? (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-lg">
            No approved artists found
          </div>
        ) : (
          <Table>
            <TableHeader className="sticky top-0 bg-white z-10">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Approved Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {approvedArtists.map((artist) => (
                <TableRow
                  key={artist._id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleRowClick(artist)}
                >
                  <TableCell className="font-medium">{artist.artistId.name}</TableCell>
                  <TableCell>{artist.artistEmail}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-sm bg-green-100 text-green-800">
                      {artist.status}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(artist.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      <ArtistDetailModal 
        artist={selectedArtist}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ApprovedArtists;
