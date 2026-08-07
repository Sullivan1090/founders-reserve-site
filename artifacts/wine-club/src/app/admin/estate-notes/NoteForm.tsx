export function NoteForm({
  action,
  defaults,
}: {
  action: (formData: FormData) => Promise<void>;
  defaults?: {
    title?: string;
    slug?: string;
    body?: string;
    author_name?: string;
    cover_image_url?: string;
    is_published?: boolean;
    notification_message?: string;
  };
}) {
  return (
    <form action={action} className="space-y-6">
      <Field
        label="Title"
        name="title"
        defaultValue={defaults?.title ?? ""}
        placeholder="Harvest begins on the estate..."
        required
      />
      <Field
        label="Slug"
        name="slug"
        defaultValue={defaults?.slug ?? ""}
        placeholder="harvest-begins (auto-generated from title if left blank)"
        hint="URL-safe identifier. Leave blank to auto-generate from title."
      />
      <Field
        label="Author Name"
        name="author_name"
        defaultValue={defaults?.author_name ?? ""}
        placeholder="Jeff Sullivan"
        hint="Optional. Shown beneath the post title."
      />
      <Field
        label="Cover Image URL"
        name="cover_image_url"
        defaultValue={defaults?.cover_image_url ?? ""}
        placeholder="https://..."
        hint="Optional. Paste a direct image URL."
      />

      {/* Body */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium" style={{ color: "#EDEAE2" }}>
          Body <span className="text-muted-foreground font-normal">(required)</span>
        </label>
        <textarea
          name="body"
          defaultValue={defaults?.body ?? ""}
          rows={16}
          required
          placeholder="Write your estate note here. Line breaks are preserved exactly as written."
          className="w-full rounded-lg px-4 py-3 text-sm bg-background border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 resize-y font-serif"
        />
        <p className="text-xs text-muted-foreground">
          Plain text only. Line breaks are preserved when displayed to members.
        </p>
      </div>

      {/* Publish toggle */}
      <div
        className="rounded-xl p-5 flex items-center justify-between gap-4"
        style={{ background: "rgba(139,103,38,0.06)", border: "1px solid rgba(139,103,38,0.2)" }}
      >
        <div>
          <p className="text-xs uppercase tracking-widest font-semibold mb-0.5" style={{ color: "#8B6726" }}>
            Publish
          </p>
          <p className="text-xs text-muted-foreground">
            Toggle on to make this post immediately visible to members.
          </p>
        </div>
        <input
          type="checkbox"
          name="is_published"
          defaultChecked={defaults?.is_published ?? false}
          className="w-5 h-5 accent-amber-600 cursor-pointer"
        />
      </div>

      {/* Push notification */}
      <div
        className="rounded-xl p-5 space-y-3"
        style={{ background: "rgba(139,103,38,0.06)", border: "1px solid rgba(139,103,38,0.2)" }}
      >
        <div>
          <p className="text-xs uppercase tracking-widest font-semibold mb-0.5" style={{ color: "#8B6726" }}>
            Push Notification
          </p>
          <p className="text-xs text-muted-foreground">
            Optional. Fill in to notify all subscribed members when you publish. Leave blank to publish quietly.
          </p>
        </div>
        <textarea
          name="notification_message"
          defaultValue={defaults?.notification_message ?? ""}
          rows={2}
          placeholder="e.g. New from the estate: harvest has begun. Read the latest note."
          className="w-full rounded-lg px-4 py-3 text-sm bg-background border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 resize-none"
        />
      </div>

      <button
        type="submit"
        className="font-serif tracking-wide px-8 py-3 rounded-full transition-all hover:opacity-90"
        style={{ background: "#8B6726", color: "#EDEAE2", border: "none", cursor: "pointer", fontSize: "0.95rem" }}
      >
        Save
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  placeholder,
  hint,
  required,
}: {
  label: string;
  name: string;
  defaultValue: string;
  placeholder?: string;
  hint?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium" style={{ color: "#EDEAE2" }}>
        {label}
        {!required && <span className="text-muted-foreground font-normal"> (optional)</span>}
      </label>
      <input
        type="text"
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg px-4 py-3 text-sm bg-background border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60"
      />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
