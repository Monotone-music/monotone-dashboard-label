import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PendingArtists from "./PendingArtistsTab";
import ApprovedArtists from "./ApprovedArtistsTab";
import RejectedArtists from "./RejectedArtistsTab";
import NoticedArtists from "./NoticedArtistTab";

const ArtistManagerPage = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Artist Applications</h1>
        <p className="text-gray-600">
          Manage and review artist applications for your label
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">10</p>
              <p className="text-sm text-gray-600">Total Applications</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">4</p>
              <p className="text-sm text-gray-600">Approved</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">4</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">3</p>
              <p className="text-sm text-gray-600">Rejected</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">5</p>
              <p className="text-sm text-gray-600">Noticed</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="noticed">Noticed</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <PendingArtists />
          </TabsContent>

          <TabsContent value="noticed">
            <NoticedArtists />
          </TabsContent>

          <TabsContent value="approved">
            <ApprovedArtists />
          </TabsContent>

          <TabsContent value="rejected">
            <RejectedArtists />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ArtistManagerPage;
