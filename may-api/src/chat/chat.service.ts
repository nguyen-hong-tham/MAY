import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
import OpenAI from "openai";

@Injectable()
export class ChatService{

    private openai=new OpenAI({
        apiKey:process.env.OPENAI_API_KEY
    });

    constructor(
        private prisma:PrismaService
    ){}

    async ask(message:string){

        const lower=message.toLowerCase();

        const healthy=
            lower.includes("healthy")
            || lower.includes("ít calo");

        const noCaffeine=
            lower.includes("không caffeine");

        const products=
            await this.prisma.product.findMany({

            where:{

                isActive:true,

                ...(healthy && {
                    calories:{
                        lte:200
                    }
                }),

                ...(noCaffeine && {
                    caffeine:false
                })

            }

        });

        const ai=
            await this.openai.chat.completions.create({

            model:"gpt-3.5-turbo",

            messages:[

                {
                    role:"system",

                    content:`Bạn là trợ lý ảo AI của quán "MAY tea & coffee" (cửa hàng trà và cà phê MAY).
Nhiệm vụ duy nhất của bạn là tư vấn chọn món và trả lời các câu hỏi về sản phẩm, thực đơn, đồ uống, giá cả của quán dựa trên danh sách sản phẩm dưới đây:
${JSON.stringify(products)}

Quy tắc bắt buộc:
1. CHỈ trả lời các câu hỏi liên quan đến sản phẩm, thực đơn, trà sữa, cà phê, topping, calo, caffeine, giá cả, so sánh giá (rẻ nhất, đắt nhất, đắt hơn, rẻ hơn, khoảng giá) hoặc gợi ý chọn món có trong danh sách sản phẩm của MAY. Các câu hỏi so sánh giá cả hoặc tìm món rẻ nhất/đắt nhất là hoàn toàn hợp lệ và phải trả lời dựa trên danh sách sản phẩm.
2. Tuyệt đối KHÔNG trả lời các câu hỏi nằm ngoài phạm vi này (ví dụ: thời tiết, lập trình, viết văn, dịch thuật, kiến thức xã hội khác...).
3. Nếu người dùng hỏi bất kỳ câu hỏi nào ngoài phạm vi trên, hãy luôn phản hồi lịch sự như sau: "Xin lỗi, tôi chỉ là trợ lý ảo hỗ trợ tư vấn các sản phẩm và thực đơn của MAY tea & coffee. Bạn vui lòng đặt câu hỏi liên quan đến thực đơn hoặc sản phẩm của quán nhé!"
4. Xử lý lỗi chính tả: Người dùng có thể viết sai chính tả (ví dụ viết "rẽ" thay vì "rẻ"). Hãy hiểu đúng ý của họ là đang hỏi về giá cả sản phẩm để phản hồi chính xác.
5. Trả lời bằng tiếng Việt thân thiện, ngắn gọn và hữu ích.
6. ĐỊNH DẠNG TRẢ LỜI BẮT BUỘC: Khi đề xuất hoặc liệt kê sản phẩm, hãy luôn trình bày dưới dạng danh sách gạch đầu dòng rõ ràng, xuống dòng cho từng sản phẩm. BẮT BUỘC phải bôi đậm tên sản phẩm bằng cú pháp **Tên sản phẩm** để làm nổi bật. Không được viết tất cả gộp chung trên một dòng hay một đoạn văn liên tục.
Ví dụ:
Dưới 50k, bạn có thể thử các món sau của quán nhé:
- **Trà vải**: 42,000đ (thơm ngọt thanh mát)
- **Trà khóm**: 45,000đ (vị ngọt dịu chua nhẹ)`
                },

                {
                    role:"user",
                    content:message
                }

            ]

        });

        return ai.choices[0].message.content;
    }

}