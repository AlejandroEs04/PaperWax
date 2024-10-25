// App.js file

import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
    Button,
    StyleSheet,
    Text,
    Image,
    SafeAreaView,
} from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

export default function App() {

    // State to hold the selected image
    const [image, setImage] = useState<null | string>(null); 
    
    // State to hold extracted text
    const [extractedText, setExtractedText] = 
        useState(""); 

    // Function to pick an image from the 
    // device's gallery
    const pickImageGallery = async () => {
        let result =
            await ImagePicker.launchImageLibraryAsync({
                mediaTypes:
                    ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                base64: true,
                allowsMultipleSelection: false,
            });
        if (!result.canceled) {
        
            // Perform OCR on the selected image
            performOCR(result.assets[0]); 
            
            // Set the selected image in state
            setImage(result.assets[0].uri); 
        }
    };

    const pickImageCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            base64: true,
            allowsMultipleSelection: false,
        });
        if (!result.canceled) {
            // Perform OCR on the captured image
            // Set the captured image in state
            performOCR(result.assets[0]); 
            setImage(result.assets[0].uri);
        }
    };

    // Function to perform OCR on an image 
    // and extract text
    const performOCR = async(file : ImagePicker.ImagePickerAsset) => {
        var myHeaders = new Headers();
        myHeaders.append("apikey", "TXaeQrb23TX3TkTl3vE0wnlSRI9n6IQU");

        var raw = file;

        var requestOptions = {
            method: 'POST',
            redirect: 'follow',
            headers: myHeaders,
            body: raw
        };

        fetch("https://api.apilayer.com/image_to_text/upload", requestOptions)
            .then(response => response.json())
            .then(result => setExtractedText(result.all_text))
            .catch(error => console.log('error', error));
    };

    console.log(typeof extractedText)

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>
                Welcome to GeeksforGeeks
            </Text>
            <Text style={styles.heading2}>
                Image to Text App
            </Text>
            <Button
                title="Pick an image from gallery"
                onPress={pickImageGallery}
            />
            <Button
                title="Pick an image from camera"
                onPress={pickImageCamera}
            />
            {image && (
                <Image
                    source={{ uri: image }}
                    style={{
                        width: 400,
                        height: 300,
                        objectFit: "contain",
                    }}
                />
            )}

            <Text style={styles.text1}>
                Extracted text:
            </Text>
            <Text style={styles.text1}>
                {extractedText}
            </Text>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "#fff",
        height: "100%",
    },
    heading: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 10,
        color: "green",
        textAlign: "center",
    },
    heading2: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
        color: "black",
        textAlign: "center",
    },
    text1: {
        fontSize: 16,
        marginBottom: 10,
        color: "black",
        fontWeight: "bold",
    },
});
