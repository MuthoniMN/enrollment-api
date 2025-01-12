ALTER TABLE "admins" ADD CONSTRAINT "admins_username_unique" UNIQUE("username");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_phoneNumber_unique" UNIQUE("phoneNumber");