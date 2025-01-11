import axios from "axios";

export const downloadImage = async (cloudinaryUrl) => {
  try {
    // Fetch the image as a blob
    const response = await axios({
      url: cloudinaryUrl,
      method: "GET",
      responseType: "blob", // Required to handle binary data
    });

    // Create a URL for the blob
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "image.jpg"); // Set the file name
    document.body.appendChild(link);
    link.click();

    // Clean up the URL object
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading the image:", error.message);
  }
};