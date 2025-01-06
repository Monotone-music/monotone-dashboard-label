import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AppliedArtist, rejectedArtists } from "@/data/mockAppliedArtistData";
import ArtistDetailModal from "@/layout/components/ArtistDetailModal/ArtistDetailModal";


const RejectedArtists = () => {
  const [selectedArtist, setSelectedArtist] = useState<AppliedArtist | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (artist: AppliedArtist) => {
    setSelectedArtist(artist);
    setIsModalOpen(true);
  };

  return (
    <>
    <div className="h-[500px] overflow-auto scrollbar-hide relative">
      {rejectedArtists.length === 0 ? (
        <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-lg">
          No rejected artists found
        </div>
      ) : (
        <Table>
          <TableHeader className="sticky top-0 bg-white z-10">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Rejected Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rejectedArtists.map((artist) => (
              <TableRow
              key={artist._id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleRowClick(artist)}
            >
                <TableCell className="font-medium">{artist.name}</TableCell>
                <TableCell>{artist.email}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded-full text-sm bg-red-100 text-red-800">
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

export default RejectedArtists;
