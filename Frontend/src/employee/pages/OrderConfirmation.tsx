import { Box, Header, Line } from "../../shared/components/ui";
import { Button } from "../../shared/components/button";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
// import emailjs from "@emailjs/browser";

import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function OrderConfirmation() {
  const [orders, setOrders] = useState<any[]>([]);
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("id");
  const pdfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/database/order.json")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Lỗi khi fetch json:", err));
  }, []);

  const order = orders.find((order) => order.id === Number(orderId));
  if (!order) return <div>Đang tải...</div>;

  const generatePDF = async () => {
    const element = pdfRef.current;

    if (!element) {
      console.error("PDF element not found");
      return;
    }

    try {
      // Tạo một div tạm thời để chứa nội dung
      const tempDiv = document.createElement("div");
      tempDiv.style.position = "absolute";
      tempDiv.style.left = "-9999px";
      tempDiv.style.top = "-9999px";
      tempDiv.style.width = "800px";
      tempDiv.style.backgroundColor = "white";
      tempDiv.style.padding = "20px";

      // Clone nội dung
      const content = element.cloneNode(true) as HTMLElement;

      // Chuyển đổi tất cả các màu oklch sang RGB
      const allElements = content.getElementsByTagName("*");
      Array.from(allElements).forEach((el) => {
        const computedStyle = window.getComputedStyle(el);
        const color = computedStyle.color;
        const backgroundColor = computedStyle.backgroundColor;

        if (color.includes("oklch")) {
          (el as HTMLElement).style.color = "rgb(0, 0, 0)"; // Mặc định là màu đen
        }
        if (backgroundColor.includes("oklch")) {
          (el as HTMLElement).style.backgroundColor = "rgb(255, 255, 255)"; // Mặc định là màu trắng
        }
      });

      // Thêm các style cần thiết
      const style = document.createElement("style");
      style.textContent = `
        * {
          color: rgb(0, 0, 0) !important;
          background-color: rgb(255, 255, 255) !important;
        }
        .text-red-500 {
          color: rgb(239, 68, 68) !important;
        }
        .border {
          border-color: rgb(229, 231, 235) !important;
        }
        .border-t {
          border-top-color: rgb(229, 231, 235) !important;
        }
        .border-b {
          border-bottom-color: rgb(229, 231, 235) !important;
        }
        .border-l {
          border-left-color: rgb(229, 231, 235) !important;
        }
      `;
      content.appendChild(style);

      tempDiv.appendChild(content);
      document.body.appendChild(tempDiv);

      // Chuyển đổi sang canvas
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        logging: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: 800,
        height: tempDiv.scrollHeight,
      });

      // Xóa div tạm thời
      document.body.removeChild(tempDiv);

      // Tạo PDF
      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const ratio = Math.min(
        (pdfWidth - 20) / imgWidth,
        (pdfHeight - 20) / imgHeight
      );

      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save(`order-${order.id}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      if (error instanceof Error) {
        alert(`Lỗi khi tạo PDF: ${error.message}`);
      } else {
        alert(
          "Có lỗi xảy ra khi tạo PDF! Vui lòng kiểm tra console để biết thêm chi tiết."
        );
      }
    }
  };

  // Commented out email functionality
  /*
  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Generate PDF first
      await generatePDF();

      // Prepare email template parameters
      const templateParams = {
        to_email: order.email,
        to_name: order.customerName,
        order_id: order.id,
        order_date: order.orderDate,
        total_price: order.totalPrice,
        customer_name: order.customerName,
        customer_phone: order.phoneNumber,
        customer_address: order.address,
        products: order.products
          .map(
            (p: any) =>
              `${p.productName} - ${p.color} - Số lượng: ${p.quantity}`
          )
          .join("\n"),
      };

      console.log("Sending email with params:", templateParams);

      // Send email using EmailJS
      const result = await emailjs.send(
        "service_gqzg3o1",
        "template_h60nnjk",
        templateParams,
        "TuxczKYiPbOXMAAy"
      );

      console.log("Email sent successfully:", result);
      alert("Email đã được gửi thành công!");
    } catch (error) {
      console.error("Error details:", error);
      if (error instanceof Error) {
        alert(`Có lỗi xảy ra khi gửi email: ${error.message}`);
      } else {
        alert(
          "Có lỗi xảy ra khi gửi email! Vui lòng kiểm tra console để biết thêm chi tiết."
        );
      }
    }
  };
  */

  return (
    <div className="w-screen h-screen flex flex-col items-center gap-[var(--medium-gap)]">
      <Header role="Nhân viên" />
      <Box
        className="flex flex-col gap-[var(--medium-gap)] p-[var(--big-gap)]"
        width="75%"
      >
        <div className="flex flex-col gap-[var(--small-gap)]" ref={pdfRef}>
          <div className="font-bold heading3">
            Xác nhận giao hàng cho đơn hàng của bạn từ Gaming Gear bởi SieuToc
          </div>
          <Line width="w-full" />
          <div className="caption flex justify-between ">
            <div className="flex flex-col ">
              <div>
                <strong>GamingGear by SieuToc</strong>{" "}
                &lt;sales@gaminggear.com.vn&gt;
              </div>
              <div>
                Đến: {order.customerName} &lt;{order.email}&gt;
              </div>
            </div>
            <div>
              {new Date().toLocaleString("vi-VN", {
                weekday: "long",
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
          <div className="px-[var(--medium-gap)] flex flex-col gap-[var(--medium-gap)]">
            <div>Xin chào {order.customerName}</div>
            <div>
              Sản phẩm trong đơn hàng của Anh/chị tại cửa hàng{" "}
              <strong>GamingGear</strong> sẽ được giao tới địa chỉ nhận hang
              theo thông tin sau:
            </div>
            <div className="flex flex-col gap-[var(--small-gap)]">
              <div>
                <div>
                  <strong>Thông tin giao hàng:</strong>{" "}
                </div>
                <div>Ngày tạo giao hang: {order.orderDate}</div>
              </div>
              <div className="w-full border border-[var(--line-color)]">
                <div className="flex">
                  <div className="border-b border-[var(--line-color)] flex-1/3 p-[var(--medium-gap)] flex flex-col gap-[var(--medium-gap)]">
                    <div>
                      <strong>Thông tin người nhận</strong>
                    </div>
                    <div className="w-full flex">
                      <div className="w-1/3">
                        <div>Họ và tên: </div>
                        <div>Số điện thoại: </div>
                        <div>Địa chỉ: </div>
                      </div>
                      <div className="w-2/3">
                        <div>{order.customerName}</div>
                        <div>{order.phoneNumber}</div>
                        <div>{order.address}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-2/3 p-[var(--medium-gap)] border-l border-b border-[var(--line-color)] flex flex-col gap-[var(--medium-gap)]">
                    <div>
                      <strong>Hình thức vận chuyển</strong>
                    </div>
                    <div>
                      <div>GIAO NHANH: 24H đơn hang dưới 300.000đ</div>
                      <div>Giao từ thứ 2 đến thứ 7</div>
                    </div>
                  </div>
                </div>

                <div className="p-[var(--medium-gap)] flex flex-col gap-[var(--medium-gap)]">
                  <div>
                    <strong>Sản phẩm được giao</strong>
                  </div>

                  <div className="w-1/2">
                    <div className="flex">
                      <div className="w-3/5">
                        <strong>Tên</strong>
                      </div>
                      <div className="w-1/5">
                        <strong>Loại</strong>
                      </div>
                      <div className="w-1/5">
                        <strong>Số lượng</strong>
                      </div>
                    </div>
                    {order.products.map((product: any) => (
                      <div className="flex">
                        <div className="w-3/5">{product.productName}</div>
                        <div className="w-1/5">{product.color}</div>
                        <div className="w-1/5">{product.quantity}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-[var(--smallest-gap)] p-[var(--medium-gap)] border-t border-[var(--line-color)]">
                  <div>
                    <strong>Tổng tiền:</strong>{" "}
                  </div>
                  <div className="text-red-500">{order.totalPrice}đ</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Button text="Tải xuống PDF" type="button" onClick={generatePDF} />
          <div>
            <div className="text-right">Trân trọng</div>
            <div>
              <strong>Ban quản trị của hàng Gaming Gear by Sieu Toc</strong>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default OrderConfirmation;
