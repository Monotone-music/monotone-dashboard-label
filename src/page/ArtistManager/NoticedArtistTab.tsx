import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { ArtistRequest, getNoticedArtistRequests } from "@/service/managerService";
import ArtistDetailModal from "@/layout/components/ArtistDetailModal/ArtistDetailModal";

const NoticedArtists = () => {
  const [selectedArtist, setSelectedArtist] = useState<ArtistRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: noticedArtists, isLoading } = useQuery({
    queryKey: ['artistRequests', 'noticed'],
    queryFn: getNoticedArtistRequests
  });

  const handleRowClick = (artist: ArtistRequest) => {
    setSelectedArtist(artist);
    setIsModalOpen(true);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="h-[500px] overflow-auto scrollbar-hide relative">
        {!noticedArtists?.length ? (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-lg">
            No noticed artists found
          </div>
        ) : (
          <Table>
            <TableHeader className="sticky top-0 bg-white z-10">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Noticed Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {noticedArtists.map((artist) => (
                <TableRow
                  key={artist._id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleRowClick(artist)}
                >
                  <TableCell className="font-medium">{artist.artistId.name}</TableCell>
                  <TableCell>{artist.artistEmail}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
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

export default NoticedArtists;
