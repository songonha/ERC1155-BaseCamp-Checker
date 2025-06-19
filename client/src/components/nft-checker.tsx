import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Wallet, 
  Search, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Loader2, 
  HelpCircle,
  Wifi,
  WifiOff
} from 'lucide-react';
import { useNFTChecker, useAddressValidation } from '@/hooks/use-nft-checker';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

/**
 * Component chính để kiểm tra NFT
 * Đây là trái tim của ứng dụng nơi người dùng tương tác
 */
export function NFTChecker() {
  const [walletAddress, setWalletAddress] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Sử dụng custom hooks để quản lý state
  const {
    isLoading,
    result,
    error,
    isInitialized,
    initialize,
    checkNFT,
    reset,
    canCheck
  } = useNFTChecker();
  
  const { isValid, isEmpty, showValidation, canSubmit } = useAddressValidation(walletAddress);

  // Khởi tạo blockchain service khi component mount
  useEffect(() => {
    initialize();
  }, [initialize]);

  /**
   * Xử lý submit form kiểm tra NFT
   */
  const handleCheckNFT = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!canSubmit || !canCheck) {
      return;
    }

    // Reset kết quả cũ trước khi kiểm tra mới
    reset();
    
    // Kiểm tra NFT với token ID mặc định là 1
    await checkNFT(walletAddress.trim(), 1);
  };

  /**
   * Reset form và kết quả
   */
  const handleReset = () => {
    setWalletAddress('');
    reset();
    setShowTooltip(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Kiểm tra NFT BaseCamp
          </h2>
          <p className="text-gray-600">
            Nhập địa chỉ ví EVM để kiểm tra quyền sở hữu NFT
          </p>
        </div>
        
        {/* Network Status Indicator */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Mạng: Base Network</span>
          {isInitialized ? (
            <div className="flex items-center space-x-1 text-green-600">
              <Wifi className="h-4 w-4" />
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          ) : (
            <div className="flex items-center space-x-1 text-gray-400">
              <WifiOff className="h-4 w-4" />
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
          )}
        </div>
      </div>

      {/* Main Form Card */}
      <Card className="educational-card">
        <CardContent className="p-6">
          <form onSubmit={handleCheckNFT} className="space-y-4">
            {/* Wallet Address Input */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="walletAddress" className="text-sm font-medium text-gray-700">
                  Địa chỉ ví EVM
                </Label>
                
                {/* Help Tooltip */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-blue-600 hover:text-blue-700"
                      onClick={() => setShowTooltip(!showTooltip)}
                    >
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-sm">
                      <strong>Địa chỉ ví EVM</strong> là một chuỗi 42 ký tự bắt đầu bằng "0x". 
                      Ví dụ: 0x742d35Cc6634C0532925a3b8D8695BB00CF1B8EF
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              
              {/* Input Field */}
              <div className="relative">
                <Input
                  id="walletAddress"
                  type="text"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  placeholder="0x1234567890abcdef1234567890abcdef12345678"
                  className="font-mono text-sm pr-10"
                  disabled={isLoading}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <Wallet className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              {/* Address Validation Status */}
              {showValidation && (
                <div className="flex items-center space-x-2">
                  {isValid ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">Địa chỉ hợp lệ</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 text-red-600" />
                      <span className="text-sm text-red-600">Địa chỉ không hợp lệ</span>
                    </>
                  )}
                </div>
              )}
              
              {/* Educational Tooltip */}
              {showTooltip && (
                <Alert className="bg-yellow-50 border-yellow-200">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800">
                    <strong>Địa chỉ ví EVM</strong> là một chuỗi 42 ký tự bắt đầu bằng "0x". 
                    Ví dụ: 0x742d35Cc6634C0532925a3b8D8695BB00CF1B8EF
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button
                type="submit"
                disabled={!canSubmit || !canCheck || isLoading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang kiểm tra...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Kiểm tra NFT
                  </>
                )}
              </Button>
              
              {(result || error) && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  disabled={isLoading}
                >
                  Làm mới
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Results Section */}
      {(result || error) && (
        <ResultsSection result={result} error={error} />
      )}
    </div>
  );
}

/**
 * Component hiển thị kết quả kiểm tra NFT
 */
interface ResultsSectionProps {
  result: any;
  error: string | null;
}

function ResultsSection({ result, error }: ResultsSectionProps) {
  if (error) {
    return (
      <Card className="educational-card">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Lỗi kết nối</h3>
              <p className="text-gray-600 mb-4">Không thể kết nối với mạng Base. Vui lòng thử lại.</p>
              <Alert className="bg-red-50 border-red-200">
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (result?.hasNFT) {
    return (
      <Card className="educational-card">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                🎉 Tìm thấy NFT BaseCamp!
              </h3>
              <p className="text-gray-600 mb-4">
                Ví này sở hữu NFT từ hợp đồng BaseCamp.
              </p>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Số lượng NFT:</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 font-mono">
                      {result.count}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Token ID:</span>
                    <Badge variant="outline" className="font-mono">
                      {result.tokenId}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="educational-card">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <XCircle className="h-6 w-6 text-gray-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Không tìm thấy NFT</h3>
            <p className="text-gray-600 mb-4">
              Ví này không sở hữu NFT từ hợp đồng BaseCamp.
            </p>
            <Alert className="bg-gray-50 border-gray-200">
              <AlertDescription className="text-gray-700">
                💡 <strong>Gợi ý:</strong> Thử với địa chỉ ví khác hoặc kiểm tra lại địa chỉ đã nhập.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
