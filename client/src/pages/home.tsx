import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  GraduationCap, 
  Box, 
  Wifi,
  Lightbulb
} from 'lucide-react';
import { NFTChecker } from '@/components/nft-checker';
import { EducationalSections } from '@/components/educational-sections';

/**
 * Trang chính của ứng dụng BaseCamp NFT Checker
 * Đây là nơi tập hợp tất cả các component và cung cấp trải nghiệm học tập hoàn chỉnh
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Navigation and Branding */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Box className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BaseCamp NFT Checker</h1>
                <p className="text-sm text-gray-600">Công cụ học tập Blockchain cho học sinh</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-sm text-gray-500">Mạng: Base Network</span>
              <div className="flex items-center space-x-1">
                <Wifi className="h-4 w-4 text-green-600" />
                <div className="w-2 h-2 bg-green-500 rounded-full status-indicator"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Introduction Section - Educational Welcome */}
        <IntroductionSection />
        
        {/* Main NFT Checker Component */}
        <div className="mb-8">
          <NFTChecker />
        </div>
        
        {/* Educational Content Sections */}
        <EducationalSections />
      </main>
    </div>
  );
}

/**
 * Component giới thiệu dự án và mục tiêu học tập
 */
function IntroductionSection() {
  return (
    <Card className="educational-card mb-8">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <GraduationCap className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Chào mừng đến với dự án Blockchain!
            </h2>
            <p className="text-gray-600 mb-4">
              Dự án này giúp bạn học cách kiểm tra NFT trên blockchain Base. 
              Nhập địa chỉ ví EVM để xem ví đó có sở hữu NFT từ hợp đồng BaseCamp hay không.
            </p>
            
            {/* Learning Objectives */}
            <Alert className="bg-blue-50 border-blue-200">
              <Lightbulb className="h-4 w-4 text-blue-600" />
              <AlertDescription>
                <h3 className="font-medium text-gray-900 mb-2">💡 Bạn sẽ học được gì?</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Cách kết nối với blockchain Base</li>
                  <li>• Tương tác với hợp đồng thông minh ERC1155</li>
                  <li>• Xác thực địa chỉ ví EVM</li>
                  <li>• Sử dụng TypeScript trong dự án blockchain</li>
                </ul>
              </AlertDescription>
            </Alert>

            {/* Technical Info */}
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs">
                Base Network
              </Badge>
              <Badge variant="secondary" className="text-xs">
                ERC1155
              </Badge>
              <Badge variant="secondary" className="text-xs">
                TypeScript
              </Badge>
              <Badge variant="secondary" className="text-xs">
                ethers.js
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
