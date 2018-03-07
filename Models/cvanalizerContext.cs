using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CVanalizer.Models
{
    public partial class cvanalizerContext : DbContext
    {
        public virtual DbSet<Candidate> Candidate { get; set; }
        public virtual DbSet<Front> Front { get; set; }
        public virtual DbSet<ObjectO> ObjectO { get; set; }
        public virtual DbSet<Project> Project { get; set; }
        public virtual DbSet<Rel> Rel { get; set; }
        public virtual DbSet<Skills> Skills { get; set; }
        public virtual DbSet<Team> Team { get; set; }
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
            modelBuilder.Entity<Candidate>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name).IsRequired();

                entity.Property(e => e.Sname)
                    .IsRequired()
                    .HasColumnName("SName");

                entity.HasOne(d => d.SkillNavigation)
                    .WithMany(p => p.Candidate)
                    .HasForeignKey(d => d.Skill)
                    .HasConstraintName("FK_Candidate_Skills");

                entity.HasOne(d => d.TeamNavigation)
                    .WithMany(p => p.Candidate)
                    .HasForeignKey(d => d.Team)
                    .HasConstraintName("FK_Candidate_Team");
            });

            modelBuilder.Entity<Front>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.JQuery).HasColumnName("jQuery");
            });

            modelBuilder.Entity<ObjectO>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.C).HasColumnName("C#");
            });

            modelBuilder.Entity<Project>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name).IsRequired();

                entity.HasOne(d => d.TeamNavigation)
                    .WithMany(p => p.Project)
                    .HasForeignKey(d => d.Team)
                    .HasConstraintName("FK_Project_Team");
            });

            modelBuilder.Entity<Rel>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Go).HasColumnName("GO");

                entity.Property(e => e.Php).HasColumnName("PHP");
            });

            modelBuilder.Entity<Skills>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.HasOne(d => d.FrontNavigation)
                    .WithMany(p => p.Skills)
                    .HasForeignKey(d => d.Front)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Skills_Front");

                entity.HasOne(d => d.ObjectONavigation)
                    .WithMany(p => p.Skills)
                    .HasForeignKey(d => d.ObjectO)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Skills_ObjectO");

                entity.HasOne(d => d.RelNavigation)
                    .WithMany(p => p.Skills)
                    .HasForeignKey(d => d.Rel)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Skills_Rel");
            });

            modelBuilder.Entity<Team>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();
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
