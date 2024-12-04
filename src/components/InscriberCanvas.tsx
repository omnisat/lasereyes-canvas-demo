import React, {useCallback, useRef, useState} from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import {  useLaserEyes } from "@omnisat/lasereyes";
import {Button} from "@/components/ui/button";

const InscriberCanvas = () => {
    const canvasRef = useRef(null);
    const { address, connect, inscribe } = useLaserEyes(); // Access wallet functionality
    const [imageData, setImageData] = useState(null);
    const [txId, setTxId] = useState<any>(null);
    const [error, setError] = useState<any>(null);

    const handleGetImage = useCallback(async () => {
        try {
            console.log({address})
            const data = await canvasRef.current.exportImage("png");
            setImageData(data);

            // Inscribe the image using the wallet
            const txIdResponse = await inscribe(
                data,
                "image/png"
            );

            setTxId(txIdResponse);

            console.log("Inscription Result:", txIdResponse);
        } catch (error) {
            console.error("Error exporting or inscribing image:", error);
            setError(error.message);
        }
    }, [inscribe, address])

    return (
        <div className={"flex flex-col w-full gap-2 min-w-lg"}>
            <ReactSketchCanvas
                ref={canvasRef}
                strokeWidth={8}
                height={"400px"}
                width={"100%"}
                strokeColor="orange"
                className={"w-full rounded-lg overflow-hidden h-full border-4 border-orange-500 grow bg-black"}
                style={{background: "black"}}
                canvasColor={"black"}
            />
            <span className={"flex flex-row gap-2"}>
            <Button className={"w-full"} variant={"outline"} onClick={() => canvasRef.current.clearCanvas()}>Clear</Button>
            <Button className={"w-full"} variant={"secondary"} onClick={handleGetImage}>Inscribe</Button>
            </span>
            {error && <span>error: {error}</span>}
            {txId && <span>txId: {txId}</span>}
        </div>
    );
};
 export default InscriberCanvas;
