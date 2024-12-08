import React, { useState, useCallback, useRef } from 'react';
import { IAudioMetadata, parseBlob } from 'music-metadata';
import styles from './styles.module.scss';
import { Button } from "@/components/ui/button";
import{ cn } from "@/lib/utils";
// import axios from 'axios';
import apiClient from '@/service/apiClient';
import { useToast } from '@/hooks/use-toast';


const UploaderPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<IAudioMetadata>();
  const [dragActive, setDragActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);


  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    await handleFile(selectedFile);
  };

  const handleFile = async (selectedFile: File | null) => {
    setFile(selectedFile);

    if (selectedFile) {
      const audioURL = URL.createObjectURL(selectedFile);
      setAudioSrc(audioURL);

      // Extract metadata
      const metadata = await parseBlob(selectedFile);
      setMetadata(metadata);
    } else {
      setAudioSrc(null);
      setMetadata(undefined);
    }
  };

  const handleDrag = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === 'dragenter' || event.type === 'dragover') {
      setDragActive(true);
    } else if (event.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(async (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      await handleFile(event.dataTransfer.files[0]);
    }
  }, []);

  const handleUpload = async () => {
    setIsUploading(true);
    if (file) {
      // Handle file upload logic here
      console.log('Uploading file:', file);
  

      const formData = new FormData();
      formData.append('file', file);
      console.log('Form data:', formData);

      toast({
        variant: "default",
        duration: 3000,
        title: "Uploading audio file",
        description: "Please wait until the process is complete!",
      })


      await apiClient.put('/tracks/parse', formData, {
        headers: {
          'Content-Type': "multipart/form-data;",
        },
      })
      .then(response => {
        console.log('File uploaded successfully:', response.data);
        toast({
          variant: "default",
          duration: 3000,
          title: "Audio uploaded successfully",
          description: "Please wait for admin confirmation!",
          className: styles['toast-success']
        });
        setIsUploading(false);
      })
      .catch(error => {
        console.error('Error uploading file:', error);
        toast({
          variant: "destructive",
          duration: 3000,
          title: "File upload failed",
          description: "Please try again later",
          className: styles['toast-error']
        });
        setIsUploading(false);
      });
      console.log('Uploading file:', file);
      
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(event.target.value);
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Upload File</h1>
      <input type="file" accept="audio/*" onChange={handleFileChange} style={{ display: 'none' }} id="fileInput" />
      <label
        htmlFor="fileInput"
        className={`${styles.drop_area} ${dragActive ? 'active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <p>Drag & Drop your audio file here or click to select a file</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-upload"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      </label>
      {audioSrc && (
        <div className={cn("w-full pt-10 flex-1 text-center items-center justify-center")}>
          <h2>Audio Preview:</h2>
          <audio
            ref={audioRef}
            src={audioSrc}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            style={{ display: 'none' }}
          />
            <div className={cn("w-full flex items-center justify-center space-x-4")}>
            <Button variant="outline" size="icon" onClick={handlePlayPause} className="rounded-full p-4 bg-green-500">
              {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
              ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M8 5v14l11-7z" />
              </svg>
              )}
            </Button>
              <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleSeek}
                className="w-96 accent-gray-500 h-1.5"
              />
            <span className="text-sm">
              {new Date(currentTime * 1000).toISOString().substr(14, 5)} / {new Date(duration * 1000).toISOString().substr(14, 5)}
            </span>
            </div>
            </div>
      
      )}
      {metadata && (
        <div className={styles.metadata}>
          <p><strong>Title:</strong> {metadata.common.title}</p>
          <p><strong>Artist:</strong> {metadata.common.artist}</p>
          <p><strong>Album:</strong> {metadata.common.album}</p>
          <p><strong>Year:</strong> {metadata.common.year}</p>
            {metadata.common.genre && metadata.common.genre.length > 0 && (
            <p><strong>Genre:</strong> {metadata.common.genre.join(', ')}</p>
            )}
          
          
        </div>
      )}
      <Button onClick={handleUpload} disabled={!file || isUploading} className='mt-4'>
        {isUploading ? (
            <svg
            className="animate-spin flex justify-center items-center h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
            </svg>
        ) : (
          'Upload'
        )}
      </Button>
  
        
    </div>
  );
};

export default UploaderPage;