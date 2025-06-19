import { ethers } from 'ethers';

// Cấu hình hợp đồng BaseCamp trên mạng Base
export const BASECAMP_CONTRACT_ADDRESS = '0x26ed98bf771f9fabc226e64cf34e9c4b6cce90d0';

// RPC URLs cho mạng Base - sử dụng environment variables với fallback
export const BASE_RPC_URL = 
  import.meta.env.VITE_BASE_RPC_URL || 
  import.meta.env.VITE_ALCHEMY_BASE_URL ||
  import.meta.env.VITE_INFURA_BASE_URL ||
  'https://mainnet.base.org'; // RPC công khai của Base

// ABI tối thiểu cho ERC1155 - chỉ cần hàm balanceOf để kiểm tra số dư NFT
export const ERC1155_ABI = [
  // Hàm balanceOf: kiểm tra số lượng NFT của một địa chỉ cho token ID cụ thể
  'function balanceOf(address account, uint256 id) view returns (uint256)',
  
  // Hàm balanceOfBatch: kiểm tra số dư cho nhiều địa chỉ và token ID cùng lúc (tuỳ chọn)
  'function balanceOfBatch(address[] accounts, uint256[] ids) view returns (uint256[])'
];

/**
 * Lớp BlockchainService: Quản lý tất cả tương tác với blockchain
 * Giúp học sinh hiểu cách tổ chức code blockchain một cách sạch sẽ
 */
export class BlockchainService {
  private provider: ethers.JsonRpcProvider | null = null;
  private contract: ethers.Contract | null = null;

  /**
   * Khởi tạo kết nối với mạng Base
   * Đây là bước đầu tiên để tương tác với blockchain
   */
  async initialize(): Promise<void> {
    try {
      console.log('🔗 Đang kết nối với mạng Base...');
      
      // Tạo provider - đây là cầu nối giữa ứng dụng và blockchain
      this.provider = new ethers.JsonRpcProvider(BASE_RPC_URL);
      
      // Kiểm tra kết nối bằng cách lấy thông tin mạng
      const network = await this.provider.getNetwork();
      console.log(`✅ Đã kết nối với mạng: ${network.name} (Chain ID: ${network.chainId})`);
      
      // Tạo contract instance để tương tác với hợp đồng BaseCamp
      this.contract = new ethers.Contract(
        BASECAMP_CONTRACT_ADDRESS,
        ERC1155_ABI,
        this.provider
      );
      
      console.log('📋 Hợp đồng BaseCamp đã sẵn sàng');
      
    } catch (error) {
      console.error('❌ Lỗi khi khởi tạo blockchain service:', error);
      throw new Error('Không thể kết nối với mạng Base. Vui lòng kiểm tra kết nối internet.');
    }
  }

  /**
   * Xác thực địa chỉ ví EVM
   * EVM (Ethereum Virtual Machine) addresses có định dạng cụ thể
   * @param address - Địa chỉ ví cần kiểm tra
   * @returns true nếu địa chỉ hợp lệ, false nếu không
   */
  validateAddress(address: string): boolean {
    try {
      // ethers.js cung cấp hàm isAddress để kiểm tra định dạng
      // Địa chỉ EVM hợp lệ phải:
      // - Bắt đầu bằng '0x'
      // - Có đúng 42 ký tự (bao gồm '0x')
      // - Chỉ chứa ký tự hex (0-9, a-f, A-F)
      return ethers.isAddress(address);
    } catch (error) {
      console.error('Lỗi xác thực địa chỉ:', error);
      return false;
    }
  }

  /**
   * Kiểm tra quyền sở hữu NFT của một địa chỉ ví
   * @param walletAddress - Địa chỉ ví cần kiểm tra
   * @param tokenId - ID của NFT (mặc định là 1)
   * @returns Thông tin về NFT nếu tìm thấy
   */
  async checkNFTOwnership(walletAddress: string, tokenId: number = 1): Promise<NFTOwnershipResult> {
    // Kiểm tra xem service đã được khởi tạo chưa
    if (!this.provider || !this.contract) {
      throw new Error('Blockchain service chưa được khởi tạo. Vui lòng gọi initialize() trước.');
    }

    // Xác thực địa chỉ ví trước khi thực hiện truy vấn
    if (!this.validateAddress(walletAddress)) {
      throw new Error('Địa chỉ ví không hợp lệ. Vui lòng kiểm tra lại.');
    }

    try {
      console.log(`🔍 Đang kiểm tra NFT cho địa chỉ: ${walletAddress}`);
      console.log(`🏷️ Token ID: ${tokenId}`);
      
      // Gọi hàm balanceOf của hợp đồng ERC1155
      // Hàm này trả về số lượng NFT mà địa chỉ sở hữu cho token ID cụ thể
      const balance = await this.contract.balanceOf(walletAddress, tokenId);
      
      // Chuyển đổi BigInt thành string để dễ xử lý
      const balanceString = balance.toString();
      const hasNFT = balance > 0n; // Sử dụng BigInt comparison
      
      console.log(`📊 Kết quả: ${hasNFT ? 'Có' : 'Không có'} NFT (Số lượng: ${balanceString})`);
      
      return {
        hasNFT,
        count: balanceString,
        tokenId,
        contractAddress: BASECAMP_CONTRACT_ADDRESS
      };
      
    } catch (error: any) {
      console.error('❌ Lỗi khi kiểm tra NFT:', error);
      
      // Xử lý các loại lỗi khác nhau để đưa ra thông báo phù hợp
      if (error.code === 'NETWORK_ERROR') {
        throw new Error('Lỗi kết nối mạng. Vui lòng kiểm tra internet và thử lại.');
      } else if (error.code === 'CALL_EXCEPTION') {
        throw new Error('Không thể gọi hàm hợp đồng. Hợp đồng có thể không tồn tại hoặc không hỗ trợ ERC1155.');
      } else {
        throw new Error(`Lỗi không xác định: ${error.message || 'Vui lòng thử lại sau.'}`);
      }
    }
  }

  /**
   * Kiểm tra nhiều token ID cùng lúc (tính năng nâng cao)
   * @param walletAddress - Địa chỉ ví cần kiểm tra
   * @param tokenIds - Mảng các token ID cần kiểm tra
   * @returns Mảng kết quả cho từng token ID
   */
  async checkMultipleTokens(walletAddress: string, tokenIds: number[]): Promise<NFTOwnershipResult[]> {
    if (!this.provider || !this.contract) {
      throw new Error('Blockchain service chưa được khởi tạo.');
    }

    if (!this.validateAddress(walletAddress)) {
      throw new Error('Địa chỉ ví không hợp lệ.');
    }

    try {
      console.log(`🔍 Đang kiểm tra ${tokenIds.length} token IDs cho địa chỉ: ${walletAddress}`);
      
      // Sử dụng Promise.all để kiểm tra tất cả token ID song song (nhanh hơn)
      const results = await Promise.all(
        tokenIds.map(async (tokenId) => {
          const balance = await this.contract!.balanceOf(walletAddress, tokenId);
          return {
            hasNFT: balance > 0n,
            count: balance.toString(),
            tokenId,
            contractAddress: BASECAMP_CONTRACT_ADDRESS
          };
        })
      );
      
      return results;
      
    } catch (error: any) {
      console.error('❌ Lỗi khi kiểm tra nhiều token:', error);
      throw new Error(`Không thể kiểm tra nhiều token: ${error.message}`);
    }
  }

  /**
   * Lấy thông tin mạng hiện tại
   * @returns Thông tin về mạng blockchain đang kết nối
   */
  async getNetworkInfo(): Promise<NetworkInfo> {
    if (!this.provider) {
      throw new Error('Provider chưa được khởi tạo.');
    }

    try {
      const network = await this.provider.getNetwork();
      const blockNumber = await this.provider.getBlockNumber();
      
      return {
        name: network.name,
        chainId: Number(network.chainId),
        blockNumber,
        rpcUrl: BASE_RPC_URL
      };
    } catch (error: any) {
      throw new Error(`Không thể lấy thông tin mạng: ${error.message}`);
    }
  }
}

// Interfaces để định nghĩa kiểu dữ liệu (TypeScript best practices)

/**
 * Kết quả kiểm tra quyền sở hữu NFT
 */
export interface NFTOwnershipResult {
  hasNFT: boolean;              // Có sở hữu NFT hay không
  count: string;                // Số lượng NFT (dạng string để tránh lỗi với số lớn)
  tokenId: number;              // ID của token được kiểm tra
  contractAddress: string;      // Địa chỉ hợp đồng
}

/**
 * Thông tin mạng blockchain
 */
export interface NetworkInfo {
  name: string;                 // Tên mạng (ví dụ: "base")
  chainId: number;              // Chain ID (ví dụ: 8453 cho Base)
  blockNumber: number;          // Số block hiện tại
  rpcUrl: string;               // URL RPC được sử dụng
}

// Xuất instance singleton để sử dụng trong toàn bộ ứng dụng
export const blockchainService = new BlockchainService();
