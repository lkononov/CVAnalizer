using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CVanalizer.Models
{
    public partial class cvanalizerContext : DbContext
    {
        public virtual DbSet<Applicant> Applicant { get; set; }
        public virtual DbSet<Skills> Skills { get; set; }
        public virtual DbSet<Technologies> Technologies { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(@"Server=DESKTOP-B2B984U\SQLEXPRESS;Database=cvanalizer; User Id=cvanalizer; Password=123QWE; Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Applicant>(entity =>
            {
                entity.HasKey(e => e.Uid);

                entity.Property(e => e.Uid).HasColumnName("UID");

                entity.Property(e => e.Name).IsRequired();

                entity.Property(e => e.SerName).IsRequired();
            });          
       
            modelBuilder.Entity<Skills>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Tid).HasColumnName("TID");

                entity.Property(e => e.Uid).HasColumnName("UID");

                entity.HasOne(d => d.T)
                    .WithMany(p => p.Skills)
                    .HasForeignKey(d => d.Tid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Skills_Technologies");

                entity.HasOne(d => d.U)
                    .WithMany(p => p.Skills)
                    .HasForeignKey(d => d.Uid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Skills_Applicant");
            });

            modelBuilder.Entity<Technologies>(entity =>
            {
                entity.HasKey(e => e.Tid);

                entity.Property(e => e.Tid).HasColumnName("TID");

                entity.Property(e => e.Name).IsRequired();
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Login).IsRequired();

                entity.Property(e => e.PasswordH).IsRequired();
            });
        }
    }
}
