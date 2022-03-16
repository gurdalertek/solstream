use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_program;
use anchor_spl::token::{TokenAccount,Mint};
use metaplex_token_metadata::state::PREFIX;
use metaplex_token_metadata::state::EDITION;


declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod solstream {
    use super::*;
    pub fn create_ad(ctx: Context<CreateAd>,title:String,description:String,id:String) -> ProgramResult {
		let ad: &mut Account<Advertisement> = &mut ctx.accounts.ad;
        let author: &Signer = &ctx.accounts.author;
        let clock: Clock = Clock::get().unwrap();

        if title.chars().count() > 50 {
            return Err(ErrorCode::TitleTooLong.into())
        }

        if description.chars().count() > 300 {
            return Err(ErrorCode::DescriptionTooLong.into())
        }
		
		if id.chars().count() > 24 {
            return Err(ErrorCode::IdTooLong.into())
        }

        ad.author = *author.key;
        ad.timestamp = clock.unix_timestamp;
        ad.title = title;
        ad.description = description;
		ad.id = id;
        Ok(())
    }
	
	
	    pub fn create_governer(ctx: Context<VerifyNFT>) -> ProgramResult {
			let nft_token_account = &ctx.accounts.nft_token_account ;
			let user = &ctx.accounts.user;
			let nft_mint_account = &ctx.accounts.nft_mint;
			
			//Check the owner of the token account
			assert_eq!(nft_token_account.owner,user.key());
			
			//Checkt the mint on the token account
			assert_eq!(nft_token_account.mint,nft_mint_account.key());
			
			//Check the amount on the token account
			assert_eq!(nft_token_account.amount,1);
			
			let master_edition_seed = &[PREFIX.as_bytes(),
			nft_token_account.mint.as_ref()
			
			,ctx.accounts.token_metadata_program.key.as_ref(),
			EDITION.as_bytes()];
			
			let(master_edition_key,master_edition_seed) =
			Pubkey::find_program_address(master_edition_seed,ctx.accounts.token_metadata_program.key);
			
           assert_eq!(master_edition_key,ctx.accounts.creature_edition.key());  
		   
		   if ctx.accounts.creature_edition.data_is_empty() {
		      return Err(ErrorCode::NotInitialized.into());
		   }   
		   
		   //Verify Metadata
		   let nft_metadata_account = &ctx.accounts.nft_metadata_account;
		   
		   let nft_mint_account_pubkey = ctx.accounts.nft_mint.key();
		   
		   //Seeds for PDA
		   let metadata_seed = &["metadata".as_bytes(),
		   ctx.accounts.token_metadata_program.key.as_ref(),
		   nft_mint_account_pubkey.as_ref()];
		   
		   //The derived key
		   let(metadata_drived_key,_bump_seed) =
		   Pubkey::find_program_address(metadata_seed,ctx.accounts.token_metadata_program.key);
		   
		   //Check that the dreived key is the current metadata account key
		   assert_eq!(metadata_drived_key,nft_metadata_account.key());
		  
           if ctx.accounts.nft_metadata_account.data_is_empty() {
               return Err(ErrorCode::NotInitialized.into());
           }   
			   
           Ok(())
		}
}

#[derive(Accounts)]
pub struct CreateAd<'info> {
    #[account(init, payer = author, space = Advertisement::LEN)]
    pub ad: Account<'info, Advertisement>,
    #[account(mut)]
    pub author: Signer<'info>,
    #[account(address = system_program::ID)]
    pub system_program: AccountInfo<'info>,
}


#[derive(Accounts)]
pub struct  VerifyNFT<'info>{
   //The owner of the NFT
   pub user: Signer<'info>,
   //The mint account of the NFT
   pub nft_mint: Account<'info,Mint>,
   //The account the user uses to hold the NFT
   pub nft_token_account: Account<'info,TokenAccount>,
   pub nft_metadata_account: AccountInfo<'info>,
   #[account(address = metaplex_token_metadata::ID)]
   pub token_metadata_program: AccountInfo<'info>,
   pub creature_edition: AccountInfo<'info>
}   

#[account]
pub struct Advertisement{
    pub author: Pubkey, 
    pub timestamp: i64,
    pub title: String,
    pub description: String,
	pub id:String
}


const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const TIMESTAMP_LENGTH: usize = 8;
const STRING_LENGTH_PREFIX: usize = 4; // Stores the size of the string.
const MAX_TITLE_LENGTH: usize = 50 * 4; // 50 chars max.
const MAX_DESCRIPTION_LENGTH: usize = 300 * 4; // 300 chars max.
const MAX_ID_LENGTH:usize = 24*4;

impl Advertisement {
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH // Author.
        + TIMESTAMP_LENGTH // Timestamp.
        + STRING_LENGTH_PREFIX + MAX_TITLE_LENGTH // Topic.
        + STRING_LENGTH_PREFIX + MAX_DESCRIPTION_LENGTH // Description.
        +STRING_LENGTH_PREFIX + MAX_ID_LENGTH; 
} 


#[error]
pub enum ErrorCode {
    #[msg("The provided title should be 50 characters long maximum.")]
    TitleTooLong,
    #[msg("The provided description should be 300 characters long maximum.")]
    DescriptionTooLong,
	#[msg("The provided Id should be 24 characters long maximum.")]
    IdTooLong,
	#[msg("Not Initialized")]
    NotInitialized,
}