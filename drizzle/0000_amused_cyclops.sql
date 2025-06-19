CREATE TABLE "Budgets" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"icon" varchar,
	"createdBy" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Expenses" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"budgetId" integer,
	"createdAt" varchar NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_budgetId_Budgets_id_fk" FOREIGN KEY ("budgetId") REFERENCES "public"."Budgets"("id") ON DELETE no action ON UPDATE no action;