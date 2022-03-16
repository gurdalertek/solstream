use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_program;
use anchor_spl::token::{TokenAccount,Mint,Token};
declare_id!("BWiAwGwv8exzjfKUDmprv22apE7RZ2WVt1PTsJANZuHL");

#[program]
pub mod solstream {
    use super::*;
    pub fn create_ad(ctx: Context<CreateAd>,title:String,description:String,id:String,deadline:i64) -> ProgramResult {
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
		ad.votes_for = 0;
		ad.votes_against = 0;
		ad.deadline = deadline;
		ad.isactive = false;
		
        Ok(())
 }
 
 pub fn vote(ctx: Context<CreateVote>,uservote:bool) -> ProgramResult {
	//let token_account = &ctx.accounts.token_account ;
	let voter = &ctx.accounts.voter;
	
	let vote: &mut Account<Vote> = &mut ctx.accounts.vote;
    let ad: &mut Account<Advertisement> = &mut ctx.accounts.ad;
    let clock: Clock = Clock::get().unwrap();
	//Check token Owner
	//assert_eq!(token_account.owner,user.key());
	//Check the amount on the token account
	//assert_eq!(token_account.amount,1);
	
	if ad.deadline < clock.unix_timestamp
	{
	   return Err(ErrorCode::VotingClosed.into())
    }
	
	if uservote == true
	{
		ad.votes_for += 1;
    }		
	else
	{
	 ad.votes_against +=1;
	}
	
	vote.voter = *voter.key;
	vote.timestamp = clock.unix_timestamp;
	vote.vote = uservote;
	

	
    Ok(())
 }	
 
 
 
 
 //Activate  Ad
 pub fn activate_ad(ctx: Context<ActivateAd>) -> ProgramResult {
    let author =  &ctx.accounts.author;
    let ad: &mut Account<Advertisement> = &mut ctx.accounts.ad;
	let clock: Clock = Clock::get().unwrap();

	
	if ad.votes_for > ad.votes_against && clock.unix_timestamp > ad.deadline  
	{  ad.isactive = true;
    }
     else
	 {
	       return Err(ErrorCode::CannotActivate.into())
     
	 }		 
    
  Ok(())

 }
 
}
 //Claim Rewards 
 /* pub fn claim_rewards(ctx: Context<ClaimRewards>) -> ProgramResult {
	  Ok(())

  }
 
    
}*/

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
pub struct CreateVote<'info>{
   	
    #[account(init, payer = voter, space = Vote::LEN)]
    pub vote: Account<'info, Vote>,
    #[account(mut)]
    pub voter: Signer<'info>,
    #[account(address = system_program::ID)]
    pub system_program: AccountInfo<'info>, 
	#[account(mut)]
    pub ad: Account<'info, Advertisement>,

}
/*
#[derive(Accounts)]
pub struct CreateTreasury<'info> {
    #[account(init, payer = author, space = Treasury::LEN)]
    pub treasury: Account<'info, Treasury>,
    #[account(mut)]
    pub author: Signer<'info>,
    #[account(address = system_program::ID)]
    pub system_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct ClaimRewards<'info>{
   	
    
    #[account(mut)]
    pub govenor: Signer<'info>,
    #[account(address = system_program::ID)]
    pub system_program: AccountInfo<'info>, 
	#[account(mut)]
    pub ad: Account<'info, Advertisement>,
    #[account(mut)]
    pub treasury: Account<'info, Treasury>,

}
*/



#[derive(Accounts)]
pub struct ActivateAd<'info>{
   	
    

    pub author: Signer<'info>,
    #[account(address = system_program::ID)]
    pub system_program: AccountInfo<'info>, 
    #[account(mut, has_one = author)]
    pub ad: Account<'info, Advertisement>,
    
}

/*#[account]
pub struct Treasury{

    pub treasury: AccountInfo<'info.TokenAccount>, 
    pub  date_created:i64,
	pub  value:i64
}
*/
#[account]
pub struct Vote{
    pub voter: Pubkey, 
	pub ad:Pubkey,
    pub vote: bool,
    pub  timestamp:i64,
}


#[account]
pub struct Advertisement{
    pub author: Pubkey, 
    pub timestamp: i64,
    pub deadline: i64,
	pub title: String,
    pub description: String,
	pub id:String,
	pub  votes_for:i64,
	pub  votes_against:i64,
	pub isactive:bool

}


const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const TIMESTAMP_LENGTH: usize = 8;
const STRING_LENGTH_PREFIX: usize = 4; // Stores the size of the string.
const MAX_TITLE_LENGTH: usize = 50 * 4; // 50 chars max.
const MAX_DESCRIPTION_LENGTH: usize = 300 * 4; // 300 chars max.
const MAX_ID_LENGTH:usize = 24*4;
const BOOL_LENGTH: usize =1;


/*impl  Treasury {
   const LEN: usize = DISCRIMINATOR_LENGTH+PUBLIC_KEY_LENGTH+TIMESTAMP_LENGTH+TIMESTAMP_LENGTH;
}*/

impl Vote {
    const LEN: usize = DISCRIMINATOR_LENGTH+PUBLIC_KEY_LENGTH+PUBLIC_KEY_LENGTH+BOOL_LENGTH+TIMESTAMP_LENGTH;

}

impl Advertisement {
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH // Author.
        + TIMESTAMP_LENGTH // Timestamp.
		+ TIMESTAMP_LENGTH  // Deadline
        + STRING_LENGTH_PREFIX + MAX_TITLE_LENGTH // Topic.
        + STRING_LENGTH_PREFIX + MAX_DESCRIPTION_LENGTH // Description.
        +STRING_LENGTH_PREFIX + MAX_ID_LENGTH+TIMESTAMP_LENGTH+TIMESTAMP_LENGTH+BOOL_LENGTH; 
} 


#[error]
pub enum ErrorCode {
    #[msg("The provided title should be 50 characters long maximum.")]
    TitleTooLong,
    #[msg("The provided description should be 300 characters long maximum.")]
    DescriptionTooLong,
	#[msg("The provided Id should be 24 characters long maximum.")]
    IdTooLong,
	#[msg("Voting is closed.")]
    VotingClosed,
	#[msg("You cannot activate this ad.")]
    CannotActivate,
	#[msg("Not Initialized")]
    NotInitialized,
}