package com.example.MakersHub.services.cloudinary;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

//@Service
//public class CloudinaryService {
//
//    private final Cloudinary cloudinary;
//
//    //cloudname , apikay abd apiSecreat from application.properties....
//    public CloudinaryService(@Value("${cloudinary.cloud-name}") String cloudName,
//                             @Value("${cloudinary.api-key}") String apiKey,
//                             @Value("${cloudinary.api-secret}") String apiSecret) {
//        this.cloudinary = new Cloudinary(ObjectUtils.asMap(
//                "cloud_name", cloudName,
//                "api_key", apiKey,
//                "api_secret", apiSecret
//        ));
//    }
//
//    public String uploadImage(MultipartFile file) throws IOException {
//        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
//        return uploadResult.get("url").toString(); // Return image URL
//    }
//}

import java.util.AbstractMap.SimpleEntry;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryService(@Value("${cloudinary.cloud-name}") String cloudName,
                             @Value("${cloudinary.api-key}") String apiKey,
                             @Value("${cloudinary.api-secret}") String apiSecret) {
        this.cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret
        ));
    }

    public SimpleEntry<String, String> uploadImage(MultipartFile file) throws IOException {
        Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
        String url = (String) uploadResult.get("url");
        String publicId = (String) uploadResult.get("public_id");
        return new SimpleEntry<>(url, publicId);
    }

    //SimpleEntry: This class is part of the Java standard library and is used to
    // create a simple key-value pair. It is immutable, meaning you
    // cannot change the key or value after creation.

    public void deleteImage(String publicId) {
        try {
            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete image: " + publicId, e);
        }
    }

    //ObjectUtils.emptyMap()
    //This is a utility method provided by Spring (or Apache Commons Lang) that returns an empty, immutable map. This is used here to indicate that no additional options are needed for the deletion process.
    //Putting It All Together
    //When you call cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());,
    // you are instructing Cloudinary to delete the media asset with the specified publicId.
    // The empty map indicates that you are using the default options for the deletion.

    //Custom Options
    //Cloudinary allows you to specify custom options to control the deletion process. Some common options include:
    //keep_original: If set to true, the original image will be kept, and only the derived versions will be deleted.
    //invalidate: If set to true, Cloudinary will invalidate the deleted image from the CDN cache, ensuring that the deleted image is no longer served.
    //Here’s an example of how you might use these options:
     //
    //Map<String, Object> options = new HashMap<>();
    //options.put("keep_original", true);
    //options.put("invalidate", true);
    //
    //cloudinary.uploader().destroy(publicId, options);
}
