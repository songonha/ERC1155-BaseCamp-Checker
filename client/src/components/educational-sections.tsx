import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronDown, 
  BookOpen, 
  Globe, 
  Code, 
  Lightbulb,
  Check,
  Wrench,
  Image,
  Layers,
  Palette
} from 'lucide-react';

/**
 * Component chứa tất cả các section giáo dục
 * Giúp học sinh hiểu về blockchain, NFT, và các công nghệ liên quan
 */
export function EducationalSections() {
  return (
    <div className="space-y-6">
      <ERC1155Section />
      <BaseNetworkSection />
      <CodeExplanationSection />
      <ProjectExtensionSection />
    </div>
  );
}

/**
 * Section giải thích về ERC1155
 */
function ERC1155Section() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="educational-card">
      <CardContent className="p-6">
        <Button
          variant="ghost"
          className="w-full flex items-center justify-between text-left p-0 hover:bg-transparent"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <span>📚 ERC1155 là gì?</span>
          </h3>
          <ChevronDown 
            className={`h-5 w-5 text-gray-400 transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`} 
          />
        </Button>
        
        {isExpanded && (
          <div className="mt-4 space-y-4 expandable-section">
            <p className="text-gray-600">
              ERC1155 là một chuẩn NFT thông minh cho phép một hợp đồng chứa nhiều loại token khác nhau.
            </p>
            
            <Alert className="bg-blue-50 border-blue-200">
              <Lightbulb className="h-4 w-4 text-blue-600" />
              <AlertDescription>
                <h4 className="font-medium text-gray-900 mb-2">Ví dụ thực tế:</h4>
                <p className="text-sm text-gray-700">
                  Giống như một hộp đồ chơi có thể chứa nhiều loại vật phẩm: búp bê, xe hơi, lego... 
                  ERC1155 cho phép một hợp đồng chứa cả skin game, vật phẩm, và thẻ bài cùng lúc.
                </p>
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Ưu điểm ERC1155</span>
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Tiết kiệm gas fee</li>
                  <li>• Hỗ trợ nhiều token trong 1 hợp đồng</li>
                  <li>• Chuyển giao hàng loạt</li>
                  <li>• Linh hoạt hơn ERC721</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Ứng dụng thực tế</h4>
                <p className="text-sm text-gray-700">
                  Được sử dụng nhiều trong game blockchain, marketplace NFT, 
                  và các ứng dụng cần quản lý nhiều loại tài sản số.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Section giải thích về mạng Base
 */
function BaseNetworkSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="educational-card">
      <CardContent className="p-6">
        <Button
          variant="ghost"
          className="w-full flex items-center justify-between text-left p-0 hover:bg-transparent"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Globe className="h-5 w-5 text-blue-600" />
            <span>🌐 Mạng Base là gì?</span>
          </h3>
          <ChevronDown 
            className={`h-5 w-5 text-gray-400 transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`} 
          />
        </Button>
        
        {isExpanded && (
          <div className="mt-4 space-y-4 expandable-section">
            <p className="text-gray-600">
              Base là một blockchain layer-2 được xây dựng trên Ethereum, giúp giao dịch nhanh hơn và rẻ hơn.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Ưu điểm</span>
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Giao dịch nhanh (2-3 giây)</li>
                  <li>• Phí thấp (&lt; $0.01)</li>
                  <li>• Tương thích 100% với Ethereum</li>
                  <li>• Được Coinbase hỗ trợ</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
                  <Wrench className="h-4 w-4 text-blue-600" />
                  <span>Công nghệ</span>
                </h4>
                <div className="text-sm text-gray-700 space-y-2">
                  <p>
                    <strong>Optimistic Rollups:</strong> Xử lý giao dịch ngoài chuỗi chính của Ethereum.
                  </p>
                  <Badge variant="outline" className="text-xs">
                    Chain ID: 8453
                  </Badge>
                </div>
              </div>
            </div>

            <Alert className="bg-yellow-50 border-yellow-200">
              <AlertDescription className="text-yellow-800">
                <strong>Tại sao chọn Base?</strong> Base được xây dựng bởi Coinbase - một trong những 
                sàn giao dịch crypto lớn nhất thế giới, đảm bảo tính ổn định và bảo mật cao.
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Section giải thích cách code hoạt động
 */
function CodeExplanationSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="educational-card">
      <CardContent className="p-6">
        <Button
          variant="ghost"
          className="w-full flex items-center justify-between text-left p-0 hover:bg-transparent"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Code className="h-5 w-5 text-blue-600" />
            <span>💻 Cách code hoạt động</span>
          </h3>
          <ChevronDown 
            className={`h-5 w-5 text-gray-400 transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`} 
          />
        </Button>
        
        {isExpanded && (
          <div className="mt-4 space-y-4 expandable-section">
            <Alert className="bg-gray-50 border-gray-200">
              <AlertDescription>
                <h4 className="font-medium text-gray-900 mb-2">Các bước thực hiện:</h4>
                <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
                  <li>Kết nối với mạng Base qua RPC provider</li>
                  <li>Xác thực địa chỉ ví EVM bằng ethers.js</li>
                  <li>Gọi hàm balanceOf của hợp đồng ERC1155</li>
                  <li>Hiển thị kết quả cho người dùng</li>
                </ol>
              </AlertDescription>
            </Alert>

            <div className="code-block">
              <pre className="text-sm">
                <code className="text-green-400">
                  <span className="text-gray-400">// Ví dụ code TypeScript</span>{'\n'}
                  <span className="text-blue-400">const</span> <span className="text-white">provider</span> = <span className="text-blue-400">new</span> <span className="text-yellow-400">ethers.JsonRpcProvider</span>(<span className="text-green-300">'BASE_RPC_URL'</span>);{'\n'}
                  <span className="text-blue-400">const</span> <span className="text-white">contract</span> = <span className="text-blue-400">new</span> <span className="text-yellow-400">ethers.Contract</span>(<span className="text-white">contractAddress</span>, <span className="text-white">abi</span>, <span className="text-white">provider</span>);{'\n'}
                  <span className="text-blue-400">const</span> <span className="text-white">balance</span> = <span className="text-blue-400">await</span> <span className="text-white">contract</span>.<span className="text-yellow-400">balanceOf</span>(<span className="text-white">walletAddress</span>, <span className="text-white">tokenId</span>);
                </code>
              </pre>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Thư viện sử dụng</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>ethers.js:</strong> Tương tác blockchain</li>
                  <li>• <strong>React:</strong> Giao diện người dùng</li>
                  <li>• <strong>TypeScript:</strong> Type safety</li>
                  <li>• <strong>Tailwind CSS:</strong> Styling</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Kiến trúc dự án</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Hooks:</strong> Quản lý state logic</li>
                  <li>• <strong>Services:</strong> Blockchain operations</li>
                  <li>• <strong>Components:</strong> UI reusable</li>
                  <li>• <strong>Utils:</strong> Helper functions</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Section gợi ý mở rộng dự án
 */
function ProjectExtensionSection() {
  return (
    <Card className="educational-card">
      <CardContent className="p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center justify-center space-x-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            <span>🚀 Mở rộng dự án</span>
          </h3>
          <p className="text-gray-600 mb-4">Một số ý tưởng để phát triển thêm:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center justify-center mb-3">
                <Image className="h-8 w-8 text-purple-500" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Hiển thị hình ảnh NFT</h4>
              <p className="text-gray-600 text-xs">
                Tích hợp IPFS để hiển thị metadata và hình ảnh của NFT
              </p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-center mb-3">
                <Layers className="h-8 w-8 text-blue-500" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Hỗ trợ nhiều hợp đồng</h4>
              <p className="text-gray-600 text-xs">
                Cho phép kiểm tra NFT từ các collection khác nhau
              </p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center justify-center mb-3">
                <Palette className="h-8 w-8 text-green-500" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Cải thiện giao diện</h4>
              <p className="text-gray-600 text-xs">
                Thêm dark mode, animations, và responsive design
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <Alert className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <AlertDescription className="text-center">
                <p className="text-sm text-gray-700 mb-2">
                  💡 <strong>Khuyến khích khám phá:</strong> Hãy thử nhập địa chỉ ví của bạn 
                  hoặc các địa chỉ ví nổi tiếng để xem kết quả!
                </p>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  <Badge variant="outline" className="text-xs font-mono">
                    0x742d35Cc6634C0532925a3b8D8695BB00CF1B8EF
                  </Badge>
                  <Badge variant="outline" className="text-xs font-mono">
                    0x8ba1f109551bD432803012645Hac136c72BdA28D
                  </Badge>
                </div>
              </AlertDescription>
            </Alert>
          </div>

          <div className="mt-4">
            <p className="text-xs text-gray-500">
              Dự án học tập • Base Network • ERC1155 • TypeScript
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
