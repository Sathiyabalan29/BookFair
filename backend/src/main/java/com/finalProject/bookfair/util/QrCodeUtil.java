package com.finalProject.bookfair.util;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

import javax.imageio.ImageIO;
import java.io.ByteArrayOutputStream;

public class QrCodeUtil {

    private QrCodeUtil() {}

    public static byte[] generate(String text) {
        try {
            QRCodeWriter writer = new QRCodeWriter();
            BitMatrix matrix =
                    writer.encode(text, BarcodeFormat.QR_CODE, 300, 300);

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            ImageIO.write(
                    MatrixToImageWriter.toBufferedImage(matrix),
                    "PNG",
                    out
            );
            return out.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("QR generation failed");
        }
    }
}
