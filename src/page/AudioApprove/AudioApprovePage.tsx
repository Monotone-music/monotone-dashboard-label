import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import PuffLoader from "react-spinners/PuffLoader";

interface ArtistAudio {
    _id: string;
    title: string;
    artistName: string;
    duration: number;
    coverImage: string;
    audioUrl: string;
    label: string;
}

const AudioApprovalPage = () => {
    const [audioRequests, setAudioRequests] = useState<ArtistAudio[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedAudio, setExpandedAudio] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        // Mock data for now
        setAudioRequests([
            {
                _id: "1",
                title: "Summer Vibes",
                artistName: "John Smith",
                duration: 180,
                coverImage: "https://github.com/shadcn.png",
                audioUrl: "sample-url",
                label: "Sony Music"
            },
            // Add more mock data
        ]);
        setLoading(false);
    }, []);

    const handleApprove = async (id: string, title: string) => {
        try {
            // API call will go here
            setAudioRequests(audioRequests.filter(request => request._id !== id));
            setExpandedAudio(null);
            toast({
                title: "Success",
                description: `Approved audio: ${title}`,
                className: "bg-green-500 text-white",
            });
        } catch (error) {
            console.error("Failed to approve audio:", error);
            toast({
                title: "Error",
                description: `Failed to approve: ${title}`,
                variant: "destructive",
            });
        }
    };

    const handleReject = async (id: string, title: string) => {
        try {
            // API call will go here
            setAudioRequests(audioRequests.filter(request => request._id !== id));
            setExpandedAudio(null);
            toast({
                title: "Success",
                description: `Rejected audio: ${title}`,
                className: "bg-red-500 text-white",
            });
        } catch (error) {
            console.error("Failed to reject audio:", error);
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
            <h1 className="text-2xl font-bold mb-6">Audio Approval Requests</h1>
            
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
                                    <p className="text-gray-600">{request.artistName}</p>
                                    <p className="text-sm text-gray-500">
                                        Label: {request.label}
                                    </p>
                                </div>
                                <span className="text-gray-500">
                                    {formatDuration(request.duration)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {expandedAudio && (
                    <div className="border rounded-lg p-6">
                        {audioRequests.map(request => 
                            request._id === expandedAudio && (
                                <div key={request._id} className="space-y-6">
                                    <img
                                        src={request.coverImage}
                                        alt={request.title}
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                    
                                    <div className="space-y-4">
                                        <audio ref={audioRef} controls className="w-full">
                                            <source src={request.audioUrl} />
                                            Your browser does not support the audio element.
                                        </audio>

                                        <div className="space-y-2">
                                            <h2 className="text-xl font-bold">{request.title}</h2>
                                            <p className="text-gray-600">{request.artistName}</p>
                                            <p className="text-gray-500">Label: {request.label}</p>
                                            <p className="text-gray-500">
                                                Duration: {formatDuration(request.duration)}
                                            </p>
                                        </div>

                                        <div className="flex gap-4">
                                            <Button
                                                className="flex-1 bg-green-600 hover:bg-green-700"
                                                onClick={() => handleApprove(request._id, request.title)}
                                            >
                                                Approve
                                            </Button>
                                            <Button
                                                className="flex-1 bg-red-600 hover:bg-red-700"
                                                onClick={() => handleReject(request._id, request.title)}
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
        </div>
    );
};

export default AudioApprovalPage;
