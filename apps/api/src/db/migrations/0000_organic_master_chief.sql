CREATE TABLE "beats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"producer_name" text NOT NULL,
	"audio_url" text NOT NULL,
	"hls_manifest_url" text,
	"artwork_url" text NOT NULL,
	"bpm" integer,
	"duration_seconds" integer NOT NULL,
	"drop_in_seconds" integer DEFAULT 0,
	"loop_start_seconds" integer,
	"loop_end_seconds" integer,
	"tags" text[] DEFAULT '{}'::text[] NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "saved_beats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"beat_id" uuid NOT NULL,
	"saved_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session_feedback" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"beat_id" uuid NOT NULL,
	"signal" text NOT NULL,
	"session_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "signal_check" CHECK ("session_feedback"."signal" IN ('like', 'dislike'))
);
--> statement-breakpoint
ALTER TABLE "saved_beats" ADD CONSTRAINT "saved_beats_beat_id_beats_id_fk" FOREIGN KEY ("beat_id") REFERENCES "public"."beats"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session_feedback" ADD CONSTRAINT "session_feedback_beat_id_beats_id_fk" FOREIGN KEY ("beat_id") REFERENCES "public"."beats"("id") ON DELETE cascade ON UPDATE no action;