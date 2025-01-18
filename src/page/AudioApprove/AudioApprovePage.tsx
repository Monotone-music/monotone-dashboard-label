import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import PuffLoader from "react-spinners/PuffLoader";
import {
  approveAudio,
  AudioRequest,
  getAudioRequests,
  rejectAudio,
} from "@/service/audioApproveService";
import { Textarea } from "@/components/ui/textarea";

const AudioApprovalPage = () => {
  const [rejectionReason, setRejectionReason] = useState<string>("");
  const [audioRequests, setAudioRequests] = useState<AudioRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedAudio, setExpandedAudio] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchAudioRequests();
  }, []);

  const fetchAudioRequests = async () => {
    try {
      const data = await getAudioRequests();
      setAudioRequests(data);
    } catch (error) {
      console.error("Error fetching audio requests:", error);
      toast({
        title: "Error",
        description: "Failed to fetch audio requests",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string, title: string) => {
    try {
      await approveAudio(id);
      setAudioRequests(audioRequests.filter((request) => request._id !== id));
      setExpandedAudio(null);
      toast({
        title: "Success",
        description: `Approved audio: ${title}`,
        className: "bg-green-500 text-white",
      });
    } catch (error) {
      console.error("Error approving audio:", error);
      toast({
        title: "Error",
        description: `Failed to approve: ${title}`,
        variant: "destructive",
      });
    }
  };

  const handleReject = async (id: string, title: string) => {
    try {
      if (!rejectionReason.trim()) {
        toast({
          title: "Error",
          description: "Please provide a reason for rejection",
          variant: "destructive",
        });
        return;
      }

      await rejectAudio(id, rejectionReason);
      setAudioRequests(audioRequests.filter((request) => request._id !== id));
      setExpandedAudio(null);
      setRejectionReason(""); // Reset reason after successful rejection

      toast({
        title: "Success",
        description: `Rejected audio: ${title}`,
        className: "bg-red-500 text-white",
      });
    } catch (error) {
      console.error("Error rejecting audio:", error);
      toast({
        title: "Error",
        description: `Failed to reject: ${title}`,
        variant: "destructive",
      });
    }
  };

  const toggleExpand = (id: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
    setExpandedAudio(expandedAudio === id ? null : id);
  };

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[500px]">
        <PuffLoader color="#36d7b7" size={60} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Artist's Audio Approval Requests
      </h1>
      {audioRequests.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-gray-500 text-lg">
          No audio requests available at the moment
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {audioRequests.map((request) => (
              <div
                key={request._id}
                className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                onClick={() => toggleExpand(request._id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="font-semibold">{request.title}</h2>
                    <p className="text-gray-600">{request.artist}</p>
                    <p className="text-sm text-gray-500">
                      Views: {request.view}
                    </p>
                  </div>
                  <span className="text-gray-500">
                    {formatDuration(request.media.fingerprint.duration)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {expandedAudio && (
            <div className="border rounded-lg p-6">
              {audioRequests.map(
                (request) =>
                  request._id === expandedAudio && (
                    <div key={request._id} className="space-y-6">
                      <img
                        src={`https://api2.ibarakoi.online/image/${request.image.filename}`}
                        alt={request.title}
                        className="w-full h-64 object-cover rounded-lg"
                      />

                      <div className="space-y-4">
                        <audio ref={audioRef} controls className="w-full">
                          <source
                            src={`https://api2.ibarakoi.online/tracks/stream/${request._id}?bitrate=lossless`}
                          />
                          Your browser does not support the audio element.
                        </audio>

                        <div className="space-y-2">
                          <h2 className="text-xl font-bold">{request.title}</h2>
                          <p className="text-gray-600">{request.artist}</p>
                          <p className="text-gray-500">
                            Status: {request.status}
                          </p>
                          <p className="text-gray-500">
                            Duration:{" "}
                            {formatDuration(request.media.fingerprint.duration)}
                          </p>
                        </div>

                        <Textarea
                          placeholder="Enter reason for rejection..."
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                          className="min-h-[100px]"
                        />

                        <div className="flex gap-4">
                          <Button
                            className="flex-1 bg-green-600 hover:bg-green-700"
                            onClick={() =>
                              handleApprove(request._id, request.title)
                            }
                          >
                            Approve
                          </Button>
                          <Button
                            className="flex-1 bg-red-600 hover:bg-red-700"
                            onClick={() =>
                              handleReject(request._id, request.title)
                            }
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AudioApprovalPage;
