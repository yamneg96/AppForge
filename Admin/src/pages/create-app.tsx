import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axios from "axios";

const API_URL = "http://localhost:3000/api";

export function CreateApp() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    longDescription: "",
    status: "draft",
    version: "1.0.0",
    techStack: "",
    features: "",
    apkUrl: "",
    ipaUrl: "",
    playStoreUrl: "",
    appStoreUrl: "",
    githubUrl: "",
  });
  const [files, setFiles] = useState({
    icon: null as File | null,
    screenshots: [] as File[],
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles((prev) => ({ ...prev, icon: e.target.files![0] }));
    }
  };

  const handleScreenshotsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => ({
        ...prev,
        screenshots: Array.from(e.target.files!),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();

      // Add text fields
      formDataToSend.append("name", formData.name);
      formDataToSend.append("slug", formData.slug);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("longDescription", formData.longDescription);
      formDataToSend.append("status", formData.status);
      formDataToSend.append("version", formData.version);
      formDataToSend.append("apkUrl", formData.apkUrl);
      formDataToSend.append("ipaUrl", formData.ipaUrl);
      formDataToSend.append("playStoreUrl", formData.playStoreUrl);
      formDataToSend.append("appStoreUrl", formData.appStoreUrl);
      formDataToSend.append("githubUrl", formData.githubUrl);

      // Add techStack and features as JSON
      formDataToSend.append(
        "techStack",
        JSON.stringify(
          formData.techStack
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        ),
      );
      formDataToSend.append(
        "features",
        JSON.stringify(
          formData.features
            .split(",")
            .map((f) => f.trim())
            .filter(Boolean),
        ),
      );

      // Add files
      if (files.icon) {
        formDataToSend.append("icon", files.icon);
      }

      if (files.screenshots.length > 0) {
        files.screenshots.forEach((file, index) => {
          formDataToSend.append(`screenshots`, file);
        });
      }

      await axios.post(`${API_URL}/apps`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/apps");
    } catch (error) {
      alert("Failed to create app");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-foreground mb-2">
          Create New App
        </h1>
        <p className="text-muted-foreground">
          Add a new application to your portfolio.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-card rounded-lg border border-border p-6 max-w-2xl space-y-6"
      >
        {/* App Name */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            App Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="My App Name"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Slug *
          </label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="my-app-name"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Short Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            placeholder="Brief description of your app"
          />
        </div>

        {/* Long Description */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Long Description
          </label>
          <textarea
            name="longDescription"
            value={formData.longDescription}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            placeholder="Detailed description of your app"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="draft">Draft</option>
            <option value="released">Released</option>
            <option value="coming_soon">Coming Soon</option>
          </select>
        </div>

        {/* Version */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Version
          </label>
          <input
            type="text"
            name="version"
            value={formData.version}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="1.0.0"
          />
        </div>

        {/* Tech Stack */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Tech Stack (comma-separated)
          </label>
          <input
            type="text"
            name="techStack"
            value={formData.techStack}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="React Native, TypeScript, Firebase"
          />
        </div>

        {/* Features */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Features (comma-separated)
          </label>
          <input
            type="text"
            name="features"
            value={formData.features}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Feature 1, Feature 2, Feature 3"
          />
        </div>

        {/* App Icon Upload */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            App Icon (PNG, JPG)
          </label>
          <input
            type="file"
            accept="image/png,image/jpeg"
            onChange={handleIconChange}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {files.icon && (
            <p className="mt-2 text-sm text-muted-foreground">
              Selected: {files.icon.name}
            </p>
          )}
        </div>

        {/* Screenshots Upload */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Screenshots (PNG, JPG - Select Multiple)
          </label>
          <input
            type="file"
            multiple
            accept="image/png,image/jpeg"
            onChange={handleScreenshotsChange}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {files.screenshots.length > 0 && (
            <p className="mt-2 text-sm text-muted-foreground">
              Selected: {files.screenshots.length} screenshot(s)
            </p>
          )}
        </div>

        {/* APK URL */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            APK Download URL
          </label>
          <input
            type="url"
            name="apkUrl"
            value={formData.apkUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="https://..."
          />
        </div>

        {/* IPA URL */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            IPA Download URL
          </label>
          <input
            type="url"
            name="ipaUrl"
            value={formData.ipaUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="https://..."
          />
        </div>

        {/* Play Store URL */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Play Store URL
          </label>
          <input
            type="url"
            name="playStoreUrl"
            value={formData.playStoreUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="https://play.google.com/..."
          />
        </div>

        {/* App Store URL */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            App Store URL
          </label>
          <input
            type="url"
            name="appStoreUrl"
            value={formData.appStoreUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="https://apps.apple.com/..."
          />
        </div>

        {/* GitHub URL */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            GitHub URL
          </label>
          <input
            type="url"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="https://github.com/..."
          />
        </div>

        {/* Submit Button */}
        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-white hover:opacity-90"
          >
            {isSubmitting ? "Creating..." : "Create App"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/apps")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
