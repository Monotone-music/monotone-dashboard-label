import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AvailableTracks from "./AvavailableTab";
import PendingTracks from "./PendingTab";
import RejectedTracks from "./RejectedTab";

const TrackManagerPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Track Status Manager</h1>
      
      <Tabs defaultValue="available">
        <TabsList className="mb-4">
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="available">
          <AvailableTracks />
        </TabsContent>

        <TabsContent value="pending">
          <PendingTracks />
        </TabsContent>

        <TabsContent value="rejected">
          <RejectedTracks />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrackManagerPage;
