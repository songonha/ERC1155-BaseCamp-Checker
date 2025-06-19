import { useState, useCallback, useEffect } from 'react';
import { blockchainService, type NFTOwnershipResult } from '@/lib/blockchain';

/**
 * Custom hook để quản lý việc kiểm tra NFT
 * Hook này tách biệt logic blockchain khỏi UI components
 */
export function useNFTChecker() {
  // State để quản lý trạng thái của ứng dụng
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<NFTOwnershipResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  /**
   * Khởi tạo blockchain service
   * Chỉ cần gọi một lần khi ứng dụng bắt đầu
   */
  const initialize = useCallback(async () => {
    if (isInitialized) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      await blockchainService.initialize();
      setIsInitialized(true);
      
    } catch (err: any) {
      setError(err.message || 'Không thể khởi tạo kết nối blockchain');
      console.error('Lỗi khởi tạo:', err);
    } finally {
      setIsLoading(false);
    }
  }, [isInitialized]);

  /**
   * Kiểm tra quyền sở hữu NFT
   * @param walletAddress - Địa chỉ ví cần kiểm tra
   * @param tokenId - ID của token (mặc định là 1)
   */
  const checkNFT = useCallback(async (walletAddress: string, tokenId: number = 1) => {
    // Đảm bảo service đã được khởi tạo trước khi kiểm tra
    if (!isInitialized) {
      await initialize();
    }

    try {
      setIsLoading(true);
      setError(null);
      setResult(null);

      // Xác thực địa chỉ trước khi gọi API
      if (!blockchainService.validateAddress(walletAddress)) {
        throw new Error('Địa chỉ ví không hợp lệ. Vui lòng kiểm tra định dạng địa chỉ.');
      }

      console.log(`🔍 Bắt đầu kiểm tra NFT cho: ${walletAddress}`);
      
      const ownershipResult = await blockchainService.checkNFTOwnership(walletAddress, tokenId);
      setResult(ownershipResult);
      
      console.log('✅ Kiểm tra hoàn tất:', ownershipResult);
      
    } catch (err: any) {
      const errorMessage = err.message || 'Có lỗi xảy ra khi kiểm tra NFT';
      setError(errorMessage);
      console.error('❌ Lỗi kiểm tra NFT:', err);
    } finally {
      setIsLoading(false);
    }
  }, [isInitialized, initialize]);

  /**
   * Xác thực địa chỉ ví
   * @param address - Địa chỉ cần xác thực
   * @returns true nếu địa chỉ hợp lệ
   */
  const validateAddress = useCallback((address: string): boolean => {
    return blockchainService.validateAddress(address);
  }, []);

  /**
   * Reset tất cả state về trạng thái ban đầu
   */
  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setIsLoading(false);
  }, []);

  /**
   * Lấy thông tin mạng hiện tại
   */
  const getNetworkInfo = useCallback(async () => {
    try {
      if (!isInitialized) {
        await initialize();
      }
      return await blockchainService.getNetworkInfo();
    } catch (err: any) {
      console.error('Lỗi lấy thông tin mạng:', err);
      throw err;
    }
  }, [isInitialized, initialize]);

  return {
    // State
    isLoading,
    result,
    error,
    isInitialized,
    
    // Actions
    initialize,
    checkNFT,
    validateAddress,
    reset,
    getNetworkInfo,
    
    // Computed values
    hasResult: result !== null,
    hasError: error !== null,
    canCheck: isInitialized && !isLoading
  };
}

/**
 * Hook đơn giản để xác thực địa chỉ trong real-time
 * @param address - Địa chỉ cần xác thực
 * @returns object chứa trạng thái validation
 */
export function useAddressValidation(address: string) {
  const [isValid, setIsValid] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  // Cập nhật validation khi address thay đổi
  useEffect(() => {
    const trimmedAddress = address.trim();
    setIsEmpty(trimmedAddress.length === 0);
    
    if (trimmedAddress.length > 0) {
      setIsValid(blockchainService.validateAddress(trimmedAddress));
    } else {
      setIsValid(false);
    }
  }, [address]);

  return {
    isValid,
    isEmpty,
    showValidation: !isEmpty,
    canSubmit: isValid && !isEmpty
  };
}
