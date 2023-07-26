"use client";
import {
  useContext,
  useState,
  useEffect,
  ChangeEventHandler,
  MouseEventHandler,
} from "react";
import { useMotionValue } from "framer-motion";
import AWS from "aws-sdk";
import { s3 } from "@/lib/s3/s3Client";
import { ProgressBar } from "./progress-bar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { awsConfig } from "@/config/aws";

export function ImageUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [upload, setUpload] = useState<AWS.S3.ManagedUpload | null>(null);
  const progress = useMotionValue(0);

  useEffect(() => {
    return upload?.abort();
  }, []);

  useEffect(() => {
    progress.set(0);
    setUpload(null);
  }, [file]);

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setFile(e.target.files![0]);
  };

  const handleUpload: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    if (!file) return;
    const params = {
      Bucket: `${awsConfig.bucketName}`,
      Key: `${awsConfig.profileImagePrefix}${file.name}`,
      Body: file,
    };
    console.log(params);

    try {
      const upload = s3.upload(params);
      setUpload(upload);
      upload.on("httpUploadProgress", (p: any) => {
        console.log(p.loaded / p.total);
        progress.set(p.loaded / p.total);
      });
      await upload.promise();
      console.log(`File uploaded successfully: ${file.name}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (!upload) return;
    upload.abort();
    progress.set(0);
    setUpload(null);
  };
  return (
    <div className="dark flex  w-full items-center justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Upload Image</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Image</DialogTitle>
            <DialogDescription>
              <form className="flex flex-col my-6 gap-6">
                <Input id="picture" type="file" onChange={handleFileChange} />
                <Button onClick={handleUpload}>Upload</Button>
                {upload && (
                  <div className="flex flex-col">
                    <Button onClick={handleCancel} variant="destructive">
                      Cancel
                    </Button>
                    <ProgressBar value={progress} />
                  </div>
                )}
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
